package com.example.tip.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document
public class User {
    @Id
    public String id;
    private String password;
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

    public void addProductToFavorite(Product product){
        favorites.add(product);
    }
    public void addProductToshopping(Product product){
        shopping.add(product);
    }
    public void addProductToCart(Product product){
        cart.add(product);
    }




}
