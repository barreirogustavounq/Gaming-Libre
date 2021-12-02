package com.example.tip.controller;

import com.example.tip.model.Category;
import com.example.tip.model.Product;
import com.example.tip.service.ProductService;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@SpringBootTest
public class ProductControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;
    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @MockBean
    private ProductService productService;

    @Test
    public void testGetAll() throws Exception {
        List<Product> products = new ArrayList<>();
        Product product = new Product();
        product.setId("1");
        product.setName("playstation");
        products.add(product);
        Mockito.when(productService.getProducts()).thenReturn(products);
        mockMvc.perform(get("/products/getAll")).andExpect(status().isOk()).andExpect(jsonPath("$", Matchers.hasSize(1)))
                .andExpect(jsonPath("$[0].name", Matchers.equalTo("playstation")));
    }

    @Test
    public void getProductsByName() throws Exception {
        List<Product> products = new ArrayList<>();
        Product product = new Product();
        Product product2 = new Product();
        product.setId("1");
        product.setName("playstation");
        product.setId("2");
        product.setName("playstation5");
        products.add(product);
        products.add(product2);
        Mockito.when(productService.getProductsByName("playstation")).thenReturn(products);
        mockMvc.perform(get("/products/resultsearch/" + "playstation")).andExpect(status().isOk()).andExpect(jsonPath("$", Matchers.hasSize(2)))
                .andExpect(jsonPath("$[0].name", Matchers.equalTo("playstation5")));
    }

    @Test
    public void getCategories() throws Exception{
        mockMvc.perform(get("/products/categories")).andExpect(status().isOk()).andExpect(jsonPath("$", Matchers.hasSize(Category.values().length)))
                .andExpect(jsonPath("$", Matchers.hasItem(Category.Cables.name())));
    }
}


