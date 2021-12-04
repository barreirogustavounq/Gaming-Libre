package com.example.tip.repository;

import com.example.tip.model.Buy;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BuyRepository extends MongoRepository<Buy, String> {
}
