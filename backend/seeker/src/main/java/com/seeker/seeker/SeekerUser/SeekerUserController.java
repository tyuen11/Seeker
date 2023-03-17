package com.seeker.seeker.SeekerUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping(path = "api/v1/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class SeekerUserController {
    
    @Autowired
    private SeekerUserService userService;

    // @GetMapping
    // public List<SeekerUser> getAllUsers() {
    //     return userService.getAllUsers();
    // }

    @PostMapping
    public SeekerUser getUser(@Valid @RequestBody SeekerUser id) {
        return userService.getUser(id.getId());
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
