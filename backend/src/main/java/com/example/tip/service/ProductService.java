package com.example.tip.service;

import com.example.tip.model.Product;
import com.example.tip.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

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

    public ResponseEntity<?> buyProduct(String id) throws ChangeSetPersister.NotFoundException {
        Product product = productRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
        int stock = product.getStock() - 1;
        product.setStock(stock);
        productRepository.save(product);
        if (stock == 0) {
            productRepository.deleteById(id);
        }
        return new ResponseEntity<>("ok", HttpStatus.OK);
    }

    public ResponseEntity<?> buyProduct(String id, Integer quantity) throws ChangeSetPersister.NotFoundException {
        Product product = productRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
        int stock = product.getStock() - quantity;
        if (stock > 0) {
            product.setStock(stock);
            productRepository.save(product);
            return new ResponseEntity<>("ok", HttpStatus.OK);

        }else {
            productRepository.deleteById(id);
        }
        return new ResponseEntity<>(product, HttpStatus.OK);
    }
}
