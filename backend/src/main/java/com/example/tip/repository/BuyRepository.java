package com.example.tip.repository;

import com.example.tip.dto.BuyDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BuyRepository extends MongoRepository<BuyDTO, String> {
}
