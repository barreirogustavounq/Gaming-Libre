package com.example.tip.model;

import com.example.tip.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class UserServiceTests {


    UserService userService;

    @BeforeEach
    public void setUp() {
        userService = new UserService();
    }

    @Test
    public void userCompleteIsValid() {
        User user = new User();
        user.setEmail("email@email.com");
        user.setUsername("username");
        user.setPassword("password");
        Assertions.assertTrue(userService.validateUser(user));
    }

    @Test
    public void userWithoutMailIsInvalid() {
        User user = new User();
        user.setUsername("username");
        user.setPassword("password");
        Assertions.assertFalse(userService.validateUser(user));
    }

    @Test
    public void userWithoutUsernameIsInvalid() {
        User user = new User();
        user.setEmail("email@email.com");
        user.setPassword("password");
        Assertions.assertFalse(userService.validateUser(user));
    }

    @Test
    public void userWithoutPasswordIsInvalid() {
        User user = new User();
        user.setEmail("email@email.com");
        user.setUsername("username");
        Assertions.assertFalse(userService.validateUser(user));
    }
}
