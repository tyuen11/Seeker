package com.seeker.seeker.SeekerUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.seeker.seeker.SeekerUser.exceptions.*;


@Service
public class SeekerUserService {

    @Autowired
    private SeekerUserRepository userRepository;

    public List<SeekerUser> getAllUsers() {
        return userRepository.findAll();
    }

    public SeekerUser getUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User with id " + id + " does not exist");
        }
        return userRepository.findById((id)).get();
    }

    public void addUser(SeekerUser user) {
        Boolean existsEmail = userRepository.selectExistsEmail(user.getEmail());
        if (existsEmail) {
            throw new BadRequestException(
                    "Email " + user.getEmail() + " taken");
        }
        userRepository.save(user);

    }

    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException("User with id " + userId + " does not exist");
        }
        userRepository.deleteById((userId));
    }

}
