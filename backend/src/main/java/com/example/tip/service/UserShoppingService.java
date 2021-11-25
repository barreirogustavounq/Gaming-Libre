package com.example.tip.service;

import com.example.tip.model.UserShopping;
import com.example.tip.repository.UserShoppingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserShoppingService {
    @Autowired
    UserShoppingRepository userShoppingRepository;

    public List<UserShopping> getAllShoppings(String user){
        return userShoppingRepository.findByUser(user);
    }
    public void saveShopping(UserShopping userShopping){
        try {
            userShoppingRepository.save(userShopping);
        }
        catch (RuntimeException err){
            System.out.println(err.getMessage());
        }
    }

}
