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
    public void addStudent(@Valid @RequestBody SeekerUser user) {
        System.out.println(user);
        userService.addUser(user);
    }
}
