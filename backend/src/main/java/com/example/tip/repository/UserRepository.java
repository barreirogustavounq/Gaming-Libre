package com.example.tip.repository;

import com.example.tip.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    public User findByFirstName(String firstName);
    public List<User> findByLastName(String lastName);
    Optional<User> findById(String id);
    public User findByUsername(String username);
}
