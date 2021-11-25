package com.example.tip.exception;

import org.springframework.http.HttpStatus;

public class UserMailAlreadyUsed {
    public static HttpStatus status = HttpStatus.BAD_REQUEST;
    public static String message  = "User mail already used";
}
