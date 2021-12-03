package com.example.tip.repository;

import com.example.tip.dto.PublicationDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PublicationRepository extends MongoRepository<PublicationDTO, String> {
}
