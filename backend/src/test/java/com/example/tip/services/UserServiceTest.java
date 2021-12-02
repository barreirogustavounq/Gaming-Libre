package com.example.tip.services;

import com.example.tip.dto.BuyDataDTO;
import com.example.tip.model.User;
import com.example.tip.repository.UserRepository;
import com.example.tip.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import static org.mockito.ArgumentMatchers.any;


@SpringBootTest
public class UserServiceTest {

    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserService userService;


    @Test
    public void whenAddUserItShouldReturnUser(){
        User user = new User();
        user.setEmail("mail@example.com");
        user.setUsername("usuario");
        user.setPassword("password");

        Mockito.when(userRepository.save(any(User.class))).thenReturn(user);

        User created = (User) userService.addUser(user).getBody();

        assert created != null;
        Assertions.assertEquals(user.getEmail(), created.getEmail());
        Assertions.assertEquals(user.getUsername(), created.getUsername());
        Assertions.assertEquals(user.getPassword(), created.getPassword());
    }

    @Test
    public void whenFindUserByUsernameGetSameUser(){
        User user = new User();
        user.setEmail("mail@example.com");
        user.setUsername("usuario");
        user.setPassword("password");

        Mockito.when(userRepository.findByUsername(any(String.class))).thenReturn(java.util.Optional.of(user));

        User created =  userService.getUserByUsername(user.getUsername());

        assert created != null;
        Assertions.assertEquals(user.getEmail(), created.getEmail());
        Assertions.assertEquals(user.getUsername(), created.getUsername());
        Assertions.assertEquals(user.getPassword(), created.getPassword());
    }

    @Test
    public void whenFindBuyDataOfUserReturnUserData(){
        User user = new User();
        user.setEmail("mail@example.com");
        user.setUsername("user");
        user.setCity("Quilmes");
        user.setPhone(1123322123);
        user.setAddress("Calle falsa 222");

        BuyDataDTO buyData = new BuyDataDTO();
        buyData.setEmail("mail@example.com");
        buyData.setCity("Quilmes");
        buyData.setPhone(1123322123);
        buyData.setAddress("Calle falsa 222");

        Mockito.when(userRepository.findByUsername(any(String.class))).thenReturn(java.util.Optional.of(user));

        BuyDataDTO buyDataRes = userService.getBuyData("user");

        Assertions.assertEquals(user.getEmail(), buyDataRes.getEmail());
        Assertions.assertEquals(user.getEmail(), buyData.getEmail());
        Assertions.assertEquals(user.getCity(), buyData.getCity());
        Assertions.assertEquals(user.getCity(), buyDataRes.getCity());
        Assertions.assertEquals(user.getPhone(), buyData.getPhone());
        Assertions.assertEquals(user.getPhone(), buyDataRes.getPhone());
        Assertions.assertEquals(user.getAddress(), buyData.getAddress());
        Assertions.assertEquals(user.getAddress(), buyDataRes.getAddress());
    }


}
