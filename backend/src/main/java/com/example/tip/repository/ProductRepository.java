package com.example.tip.repository;

import com.example.tip.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {

    List<Product> findByNameContains(String name);
    List<Product> findAllByNameIsContaining(String name);
}
