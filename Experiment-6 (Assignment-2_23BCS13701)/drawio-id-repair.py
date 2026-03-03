import sys
import shutil
import xml.etree.ElementTree as ET
from collections import Counter

def load_xml(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    return content, ET.fromstring(content)


def collect_elements_with_ids(root_node):
    elements = []
    for node in root_node.iter():
        if "id" in node.attrib:
            elements.append(node)
    return elements


def generate_new_id(existing_ids, prefix="node"):
    index = 1
    while True:
        candidate = f"{prefix}_{index}"
        if candidate not in existing_ids and candidate != "224":
            existing_ids.add(candidate)
            return candidate
        index += 1


def resolve_duplicate_ids(elements):
    id_counter = Counter()
    replacements = {}
    existing = set()

    # Count occurrences
    for elem in elements:
        elem_id = elem.attrib["id"]
        id_counter[elem_id] += 1
        existing.add(elem_id)

    # Rename duplicates and forbidden id 224
    for elem in elements:
        current_id = elem.attrib["id"]

        if current_id == "224" or id_counter[current_id] > 1:
            new_id = generate_new_id(existing, prefix="fixed")
            replacements[current_id] = new_id
            elem.attrib["id"] = new_id
            id_counter[current_id] -= 1

    return replacements


def update_relationship_references(root_node, id_mapping):
    reference_fields = ["parent", "source", "target"]

    for node in root_node.iter():
        for field in reference_fields:
            if field in node.attrib:
                ref_value = node.attrib[field]
                if ref_value in id_mapping:
                    node.attrib[field] = id_mapping[ref_value]


def save_changes(original_path, original_content, root_node):
    backup_path = original_path + ".backup"

    shutil.copyfile(original_path, backup_path)

    updated_xml = ET.tostring(root_node, encoding="utf-8").decode("utf-8")

    if original_content.strip().startswith("<?xml"):
        header = original_content.split("?>", 1)[0] + "?>\n"
        if not updated_xml.startswith(header):
            updated_xml = header + updated_xml

    with open(original_path, "w", encoding="utf-8") as f:
        f.write(updated_xml)

    return backup_path


def main():
    if len(sys.argv) != 2:
        print("Usage: python repair_drawio_ids.py <diagram.drawio>")
        sys.exit(1)

    file_path = sys.argv[1]

    print(f"Processing file: {file_path}")

    xml_content, root = load_xml(file_path)
    id_elements = collect_elements_with_ids(root)

    id_changes = resolve_duplicate_ids(id_elements)
    update_relationship_references(root, id_changes)

    backup_file = save_changes(file_path, xml_content, root)

    print(f"Backup created at: {backup_file}")
    print("ID updates completed.")
    print("Modified IDs:")
    for old, new in id_changes.items():
        print(f"  {old} → {new}")


if __name__ == "__main__":
    main()
