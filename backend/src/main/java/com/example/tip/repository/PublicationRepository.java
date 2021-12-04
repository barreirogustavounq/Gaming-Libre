package com.example.tip.repository;

import com.example.tip.model.Publication;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PublicationRepository extends MongoRepository<Publication, String> {
}
