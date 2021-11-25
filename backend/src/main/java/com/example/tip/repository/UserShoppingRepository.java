package com.example.tip.repository;

import com.example.tip.model.UserShopping;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserShoppingRepository extends MongoRepository<UserShopping, String> {
    
    List<UserShopping> findAllById( String id);
    List<UserShopping> findByUser( String user);

    
}
