package com.example.tip.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BuyDataDTO {
    private String address;
    private String mail;
    private Integer phone;
    private String city;
}
