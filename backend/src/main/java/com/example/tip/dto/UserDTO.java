package com.example.tip.dto;

import com.example.tip.model.Product;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserDTO {
    public String id;
    private String firstName;
    private String lastName;
    private String username;
    private String address;
    private String city;
    private String state;
    private int postalCode;
    private String birthday;
    private String email;
    private int phone;
    private List<Product> favorites;
    private List<Product> shopping;
    private List<Product> cart;

    public UserDTO(String id, String firstName, String lastName, String username, String address, String city, String state, int postalCode, String birthday, String email, int phone, List<Product> favorites, List<Product> shopping, List<Product> cart) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.address = address;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.birthday = birthday;
        this.email = email;
        this.phone = phone;
        this.favorites = favorites;
        this.shopping = shopping;
        this.cart = cart;
    }
}
