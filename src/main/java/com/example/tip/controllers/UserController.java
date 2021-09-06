package com.example.tip.controllers;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableAutoConfiguration
public class UserController {

    @GetMapping(value = "users")
    public String getUsers(){
        return "Hello";}
}
