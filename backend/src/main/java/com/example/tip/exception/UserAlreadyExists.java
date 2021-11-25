package com.example.tip.exception;

import org.springframework.http.HttpStatus;

public class UserAlreadyExists {
    public static HttpStatus status = HttpStatus.NOT_FOUND;
    public static String message  = "User Already Exists";
}
