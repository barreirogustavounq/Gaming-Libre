package com.example.tip.service;

import com.example.tip.model.Category;
import com.example.tip.model.Product;
import com.example.tip.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product addProduct(Product product) {
        product.setBuyQuantity(1);
        return productRepository.save(product);
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    public List<Product> getProductsByName(String name) {
        return productRepository.findByNameRegex(name);
    }


    public ResponseEntity<?> buyProduct(String id, Integer quantity) throws ChangeSetPersister.NotFoundException {
        Product product = productRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
        int stock = product.getStock() - quantity;
        if(stock < 0) {
            return new ResponseEntity<>("no hay stock suficiente del producto " + product.getName(), HttpStatus.BAD_REQUEST);
        }
        if (stock > 0) {
            product.setStock(stock);
            productRepository.save(product);
        } else {
            productRepository.deleteById(id);
        }
        return new ResponseEntity<>("ok", HttpStatus.OK);
    }

    public List<Product> findByCategory(String category, String product) {
        Category cat = getCategory(category);
        if (Category.all == cat ) {
            return productRepository.findByNameContains(product);
        }
        return productRepository.findByNameContains(product).stream().filter(prod -> prod.getCategory() == cat).collect(Collectors.toList());
    }
    public List<Product> findByCategory(String category) {

        Category cat = getCategory(category);
        if (Category.all == cat ) {
            return productRepository.findAll();
        }
        return productRepository.findAllByCategory(category);
    }


    private Category getCategory(String category) {
        return Arrays.stream(Category.values()).filter(cat -> Category.valueOf(category) == cat).findFirst().orElseThrow(NoSuchFieldError::new);
    }


    public ResponseEntity<?> changeStock(String id, Integer newStock) throws ChangeSetPersister.NotFoundException {
        Product product = productRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
        product.setStock(newStock);
        return new ResponseEntity<>(productRepository.save(product), HttpStatus.OK);
    }
}
