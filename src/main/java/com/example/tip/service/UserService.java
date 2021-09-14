package com.example.tip.service;

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
    public void addUser(User user){
        userRepository.save(user);
    }

    public User getUserByUsername(String username) throws UserNoExistException{
        User user = userRepository.findByUsername(username);
        try{
            user.getId();
        }catch (Exception e){
            throw new UserNoExistException(HttpStatus.NOT_FOUND);
        }
       return user;
    }

    public void deleteUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        userRepository.delete(user);
    }

}
