package com.example.tip.repository;

import com.example.tip.model.Category;
import com.example.tip.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {

    List<Product> findByNameContains(String name);

    @Query(value = "{'name': {$regex : ?0, $options: 'i'}}")
    List<Product> findByNameRegex(String name);


    List<Product> findAllByCategory(String category);

}
