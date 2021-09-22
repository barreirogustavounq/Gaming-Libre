package com.example.tip.service;

import com.example.tip.dto.LoginDTO;
import com.example.tip.exception.BadUserException;
import com.example.tip.exception.UserAlreadyExists;
import com.example.tip.exception.UserNoExistException;
import com.example.tip.model.User;
import com.example.tip.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public List<User> getAll(){
        return userRepository.findAll();
    }
    public Optional<User> getUserById(String id){
        return userRepository.findById(id);
    }

    public User addUser(User user){
        if (validateUser(user)){
            Optional<User> userCheck = userRepository.findByUsername(user.getUsername());
            if(userCheck.isPresent()) throw new UserAlreadyExists(HttpStatus.ALREADY_REPORTED);
            return userRepository.save(user);
        }else {
            throw new BadUserException(HttpStatus.BAD_REQUEST);
        }
    }

    private boolean validateUser(User user) {
        return user.getUsername() != null && user.getEmail() != null && user.getPassword() != null;
    }

    public User getUserByUsername(String username) throws UserNoExistException{
        Optional<User> user = userRepository.findByUsername(username);
        return user.orElseThrow(() -> new UserNoExistException(HttpStatus.NOT_FOUND));
    }

    public void deleteUserByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        userRepository.delete(user.orElseThrow(() -> new UserNoExistException(HttpStatus.NOT_FOUND)));
    }


    public User login(LoginDTO login) {
        User user = userRepository.findByUsername(login.getUsername()).orElseThrow(() -> new UserNoExistException(HttpStatus.NOT_FOUND));
        if(user.getPassword().equals(login.getPassword().trim())){
            return user;
        }else {
            throw new BadUserException(HttpStatus.BAD_REQUEST);
        }
    }
}
