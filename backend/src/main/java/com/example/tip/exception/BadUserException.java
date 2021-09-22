package com.example.tip.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;

public class BadUserException extends ResponseStatusException {
    static String reason = "User already exists";
    public BadUserException(HttpStatus status) {
        super(status, reason);
        StackTraceElement[] stackTraceElements = new ArrayList<StackTraceElement>().toArray(new StackTraceElement[0]);
        super.setStackTrace(stackTraceElements);
    }
}
