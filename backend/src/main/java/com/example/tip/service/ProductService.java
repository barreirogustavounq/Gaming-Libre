package com.example.tip.service;

import com.example.tip.model.Buy;
import com.example.tip.model.Publication;
import com.example.tip.model.Category;
import com.example.tip.model.Product;
import com.example.tip.repository.BuyRepository;
import com.example.tip.repository.ProductRepository;

import com.example.tip.repository.PublicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    BuyRepository buyRepository;

    @Autowired
    PublicationRepository publicationRepository ;

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product addProduct(Product product, String userId) {
        product.setBuyQuantity(1);
        Optional<Publication> publicationDTO = publicationRepository.findById(userId);
        addToPublicationRepository(userId, product, publicationDTO);
        return productRepository.save(product);
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    public List<Product> getProductsByName(String name) {
        return productRepository.findByNameRegex(name);
    }

    public List<Product> findByCategory(String category, String product) {
        Category cat = getCategory(category);
        if (Category.all == cat) {
            return productRepository.findByNameContains(product);
        }
        return productRepository.findByNameContains(product).stream().filter(prod -> prod.getCategory() == cat).collect(Collectors.toList());
    }

    public List<Product> findByCategory(String category) {
        Category cat = getCategory(category);
        if (Category.all == cat) {
            return productRepository.findAll();
        }
        return productRepository.findAllByCategory(category);
    }


    private Category getCategory(String category) {
        return Arrays.stream(Category.values()).filter(cat -> Category.valueOf(category) == cat).findFirst().orElseThrow(NoSuchFieldError::new);
    }

    public ResponseEntity<?> changeStock(String id, Integer newStock, String userId) throws ChangeSetPersister.NotFoundException {
        Product product = productRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
        Optional<Buy> buyDTO = buyRepository.findById(userId);
        addToBuyRepository(userId, product, buyDTO);
        if (newStock <= 0) {
            productRepository.deleteById(id);
            deleteProductPublication(userId, id);
            return new ResponseEntity<>("compró la ultima unidad del producto", HttpStatus.OK);
        }
        product.setStock(newStock);
        return new ResponseEntity<>(productRepository.save(product), HttpStatus.OK);
    }

    public ResponseEntity<?> buyProduct(String id, Integer quantity, String userId) throws ChangeSetPersister.NotFoundException {
        Product product = productRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
        int stock = product.getStock() - quantity;
        Optional<Buy> buyDTO = buyRepository.findById(userId);
        addToBuyRepository(userId, product, buyDTO);
        if (stock < 0) {
            return new ResponseEntity<>("no hay stock suficiente del producto " + product.getName(), HttpStatus.BAD_REQUEST);
        }
        if (stock > 0) {
            product.setStock(stock);
            productRepository.save(product);
        } else {
            deleteProductPublication(userId, id);
            productRepository.deleteById(id);
        }
        return new ResponseEntity<>("ok", HttpStatus.OK);
    }

    private void deleteProductPublication(String userId, String productId) {
        Optional<Publication> publication = publicationRepository.findById(userId);
        Publication publicToSave;
        if(publication.isPresent()){
            List<Product> products= publication.get().getProducts();
            products = products.stream().filter(product -> product.getId() != productId).collect(Collectors.toList());
            publicToSave = publication.get();
            publicToSave.setProducts(products);
            publicationRepository.save(publicToSave);
        }
    }

    private void addToBuyRepository(String userId, Product product, Optional<Buy> buyDTO) {
        Buy buy;
        if (buyDTO.isPresent()) {
            buy = buyDTO.get();
            List<Product> products = buy.getProducts();
            products.add(product);
        } else {
            buy = new Buy();
            List<Product> products = new ArrayList<>();
            products.add(product);
            buy.setProducts(products);
            buy.setUserId(userId);
        }
        buyRepository.save(buy);
    }

    private void addToPublicationRepository(String userId, Product product, Optional<Publication> publicationDTO) {
        Publication publication;
        if (publicationDTO.isPresent()) {
            publication = publicationDTO.get();
            List<Product> products = publication.getProducts();
            products.add(product);
        } else {
            publication = new Publication();
            List<Product> products = new ArrayList<>();
            products.add(product);
            publication.setProducts(products);
            publication.setUserId(userId);
        }
        publicationRepository.save(publication);
    }

    public List<Product> getBuys(String userId) {
        Optional<Buy> buy = buyRepository.findById(userId);
        if (buy.isPresent()) return buy.get().getProducts();
        return new ArrayList<>();
    }

    public List<Product> getPublications(String userId) {
        Optional<Publication> publication = publicationRepository.findById(userId);
        if (publication.isPresent()) return publication.get().getProducts();
        return new ArrayList<>();
    }

}
