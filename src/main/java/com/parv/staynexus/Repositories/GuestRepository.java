package com.parv.staynexus.Repositories;

import com.parv.staynexus.Dto.GuestDTO;
import com.parv.staynexus.Entities.GuestEntity;
import com.parv.staynexus.Entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuestRepository extends JpaRepository<GuestEntity, Long> {
    List<GuestDTO> findByUser(UserEntity user);
}