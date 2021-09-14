package com.example.tip.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;

public class UserNoExistException extends ResponseStatusException {
    static String reason = "User could not be found";
    public UserNoExistException(HttpStatus status) {
        super(status, reason);
        StackTraceElement[] stackTraceElements = new ArrayList<StackTraceElement>().toArray(new StackTraceElement[0]);
        super.setStackTrace(stackTraceElements);
    }
}
