package com.example.tip.controllers;

import com.example.tip.model.Product;
import com.example.tip.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@EnableAutoConfiguration
@RequestMapping("products")
@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("getAll")
    public List<Product> getAllProducts() {
        return productService.getProducts();
    }

    @PostMapping("add")
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    @DeleteMapping("delete/{id}")
    public void deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
    }

    @GetMapping("resultsearch/{name}")
    public List<Product> getProductsByName(@PathVariable String name) {
        return productService.getProductsByName(name);
    }

    @PostMapping("buy/{id}")
    public ResponseEntity<?> buyProduct(@PathVariable String id) throws ChangeSetPersister.NotFoundException {
        return productService.buyProduct(id,1);
    }

    @PostMapping("buy/{id}/{quantity}")
    public ResponseEntity<?> buyProduct(@PathVariable String id, @PathVariable Integer quantity) throws ChangeSetPersister.NotFoundException {
        return productService.buyProduct(id, quantity);
    }

}
