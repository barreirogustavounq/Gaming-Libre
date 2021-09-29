package com.example.tip.service;

import com.example.tip.model.Product;
import com.example.tip.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
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
        return productRepository.save(product);
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    public List<Product> getProductsByName(String name){
        return productRepository.findByNameRegex(name);
    }

    public String buyProduct(String id) throws ChangeSetPersister.NotFoundException {
        Product product = productRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
        int stock = product.getStock() -1;
        product.setStock(stock);
        productRepository.save(product);
        if(stock == 0){
            productRepository.deleteById(id);
        }
        return "OK";
    }
}
