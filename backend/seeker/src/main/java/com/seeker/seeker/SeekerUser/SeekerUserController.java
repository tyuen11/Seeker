package com.seeker.seeker.SeekerUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import javax.validation.Valid;


@RestController
@RequestMapping(path = "api/v1/users")
public class SeekerUserController {
    
    @Autowired
    private SeekerUserService userService;

    @GetMapping
    public List<SeekerUser> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public SeekerUser getUser(@Valid @RequestBody Long id) {
        return userService.getUser(id);
    }

    @PostMapping(value="/add")
    public void addUser(@Valid @RequestBody SeekerUser user) {
        userService.addUser(user);
    }

    @DeleteMapping(value="/delete")
    public void removeUser(@Valid @RequestBody Long id) {
        userService.deleteUser(id);
    }
}
