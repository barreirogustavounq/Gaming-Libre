package com.example.tip.controllers;

import com.example.tip.dto.LoginDTO;
import com.example.tip.exception.UserNoExistException;
import com.example.tip.model.User;
import com.example.tip.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@EnableAutoConfiguration
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping(value = "users")
    public List<User> getUsers(){
        return userService.getAll();}

    @PostMapping(value = "user/add-user")
    public User addUser(@RequestBody User user){
        return userService.addUser(user);
    }

    @GetMapping(value = "user/{username}")
    public User getUserByUsername(@PathVariable String username) throws UserNoExistException {
        return userService.getUserByUsername(username);
    }
    @GetMapping(value = "user/count/{id}")
    public Optional<User> getUserById(@PathVariable String id) throws UserNoExistException {
        return userService.getUserById(id);
    }

    @DeleteMapping(value = "user/{username}")
    public void deleteUser(@PathVariable String username){
        userService.deleteUserByUsername(username);
    }

    @GetMapping(value="user/login")
    public User login(@RequestBody LoginDTO login){
        return userService.login(login);

    }

}
