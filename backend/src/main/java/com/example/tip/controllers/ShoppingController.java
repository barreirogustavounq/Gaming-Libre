package com.example.tip.controllers;

import com.example.tip.model.UserShopping;
import com.example.tip.service.UserService;
import com.example.tip.service.UserShoppingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@EnableAutoConfiguration
@CrossOrigin(origins = "*")
public class ShoppingController {

    @Autowired
    UserShoppingService userShoppingService;

    @Autowired
    UserService userService;

    @GetMapping(value="{user}/shopping")
    public List<UserShopping> getShoppingsbyUser(@PathVariable String user){
        return userShoppingService.getAllShoppings(user);
    }

    @PostMapping(value = "shopping/add-shopping")
    public void addUserShopping(@RequestBody UserShopping userShopping){
        userShoppingService.saveShopping(userShopping);
    }

}
