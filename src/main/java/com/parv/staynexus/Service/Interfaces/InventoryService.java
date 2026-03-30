package com.parv.staynexus.Service.Interfaces;

import com.parv.staynexus.Dto.*;
import com.parv.staynexus.Dto.HotelPriceDTO;
import com.parv.staynexus.Dto.HotelSearchRequest;
import com.parv.staynexus.Dto.InventoryDTO;
import com.parv.staynexus.Dto.UpdateInventoryRequestDTO;
import com.parv.staynexus.Entities.RoomEntity;
import org.springframework.data.domain.Page;

import java.util.List;

public interface InventoryService {
    void initializeRoomForAYear(RoomEntity room);

    void deleteAllInventories(RoomEntity room);

    Page<HotelPriceDTO> searchHotels(HotelSearchRequest hotelSearchRequest);

    List<InventoryDTO> getAllInventoryByRoom(Long roomId);

    void updateInventory(Long roomId, UpdateInventoryRequestDTO updateInventoryRequestDto);
}
