package com.parv.staynexus.Service.Interfaces;

import com.parv.staynexus.Dto.ProfileUpdateRequestDTO;
import com.parv.staynexus.Dto.UserDTO;
import com.parv.staynexus.Entities.UserEntity;

public interface UserService {
    UserEntity getUserById(Long id);

    void updateProfile(ProfileUpdateRequestDTO profileUpdateRequestDto);

    UserDTO getMyProfile();
}
