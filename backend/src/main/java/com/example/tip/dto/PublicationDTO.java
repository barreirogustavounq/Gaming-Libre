package com.example.tip.dto;

import com.example.tip.model.Product;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class PublicationDTO {

    @Id
    public String userId;
    public List<Product> products;
}
