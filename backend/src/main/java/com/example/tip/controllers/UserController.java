package com.example.tip.controllers;

import com.example.tip.exception.UserNoExistException;
import com.example.tip.model.User;
import com.example.tip.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@EnableAutoConfiguration
public class UserController {

    @Autowired
    UserService userService;
    @GetMapping(value = "users")
    public List<User> getUsers(){
        return userService.getAll();}

    @PostMapping(value = "user/add-user")
    public void addUser(@RequestBody User user){
        userService.addUser(user);
    }

    @GetMapping(value = "user/{username}")
    public User getUserByUsername(@PathVariable String username) throws UserNoExistException {
        return userService.getUserByUsername(username);
    }
    @DeleteMapping(value = "user/{username}")
    public void deleteUser(@PathVariable String username){
        userService.deleteUserByUsername(username);
    }
}
