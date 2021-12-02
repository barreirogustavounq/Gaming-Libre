package com.example.tip.controller;

import com.example.tip.dto.BuyDataDTO;
import com.example.tip.model.User;
import com.example.tip.service.UserService;
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
public class UserControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;
    private MockMvc mockMvc;

    @BeforeEach
    public void setUp(){
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @MockBean
    private UserService userService;

    @Test
    public void testGetAll() throws Exception{
        List<User> users = new ArrayList<>();
        User user = new User();
        user.setId("1");
        user.setUsername("user");
        users.add(user);
        Mockito.when(userService.getAll()).thenReturn(users);
        mockMvc.perform(get("/users")).andExpect(status().isOk()).andExpect(jsonPath("$", Matchers.hasSize(1)))
                .andExpect(jsonPath("$[0].username", Matchers.equalTo("user")));
    }
    @Test
    public void testGetOwnerData() throws Exception{
        String userMail = "mail@mail.com";
        User user = new User();
        user.setId("1");
        user.setEmail(userMail);
        BuyDataDTO buyDataDTO = new BuyDataDTO();
        buyDataDTO.setEmail(userMail);
        Mockito.when(userService.getBuyData("user")).thenReturn(buyDataDTO);
        mockMvc.perform(get("/user/buyData/"+"user")).andExpect(status().isOk())
                .andExpect(jsonPath("$.email", Matchers.equalTo(userMail)));
    }
}
