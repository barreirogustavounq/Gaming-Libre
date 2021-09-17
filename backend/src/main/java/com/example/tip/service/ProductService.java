package com.example.tip.service;

import com.example.tip.model.Product;
import com.example.tip.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;


    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product addProduct(Product product) {
        String productId = generateId(product.getName());
        product.setId(productId);
        return productRepository.insert(product);
    }

    private String generateId(String name) {
        String[] nameList = name.split(" ");
        StringBuilder id = new StringBuilder();
        for (String namePart : nameList) {
            id.append(namePart.trim());
        }
        return id.toString().toLowerCase();
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }
}
