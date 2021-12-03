package com.example.tip.dto;

import com.example.tip.model.Product;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class BuyDTO {
    @Id
    public String userId;
    public List<Product> products;
}
