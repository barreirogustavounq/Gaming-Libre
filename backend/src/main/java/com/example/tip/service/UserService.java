package com.example.tip.service;

import com.example.tip.dto.BuyDataDTO;
import com.example.tip.dto.ErrorDTO;
import com.example.tip.dto.LoginDTO;
import com.example.tip.dto.UserDTO;
import com.example.tip.exception.BadUserException;
import com.example.tip.exception.UserAlreadyExists;
import com.example.tip.exception.UserMailAlreadyUsed;
import com.example.tip.exception.UserNoExistException;
import com.example.tip.model.User;
import com.example.tip.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public ResponseEntity<?> addUser(User user) {
        if (validateUser(user)) {
            Optional<User> userCheck = userRepository.findByUsername(user.getUsername());
            Optional<User> userMailCheck = userRepository.findByEmail(user.getEmail());
            if (userCheck.isPresent()) {
                userRepository.save(userCheck.get());
                return new ResponseEntity<>(new ErrorDTO(UserAlreadyExists.message), UserAlreadyExists.status);
            }
            if (userMailCheck.isPresent()) {
                userRepository.save(userMailCheck.get());
                return new ResponseEntity<>(new ErrorDTO(UserMailAlreadyUsed.message), UserMailAlreadyUsed.status);
            }
        }
        return new ResponseEntity<>(userRepository.save(user),HttpStatus.OK);
    }

    public boolean validateUser(User user) {
        return user.getUsername() != null && user.getEmail() != null && user.getPassword() != null;
    }

    public User getUserByUsername(String username) throws UserNoExistException {
        Optional<User> user = userRepository.findByUsername(username);
        return user.orElseThrow(() -> new UserNoExistException(HttpStatus.NOT_FOUND));
    }

    public void deleteUserByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        userRepository.delete(user.orElseThrow(() -> new UserNoExistException(HttpStatus.NOT_FOUND)));
    }

    public UserDTO login(LoginDTO login) {
        User user = userRepository.findByUsername(login.getUsername()).orElseThrow(() -> new UserNoExistException(HttpStatus.NOT_FOUND));
        UserDTO userDTO = new UserDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                user.getAddress(),
                user.getCity(),
                user.getState(),
                user.getPostalCode(),
                user.getBirthday(),
                user.getEmail(),
                user.getPhone(),
                user.getFavorites(),
                user.getShopping(),
                user.getCart(),
                user.getCbu()
        );
        if (user.getPassword().equals(login.getPassword().trim())) {
            return userDTO;
        } else {
            throw new BadUserException(HttpStatus.BAD_REQUEST);
        }
    }

    public User updateUser(User user) {
        String pass = userRepository.findByUsername(user.getUsername()).get().getPassword();
        User userResult = new User(user.getId(),
                pass,
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                user.getAddress(),
                user.getCity(),
                user.getState(),
                user.getPostalCode(),
                user.getBirthday(),
                user.getEmail(),
                user.getPhone(),
                user.getFavorites(),
                user.getShopping(),
                user.getCart(),
                user.getCbu());
        return  userRepository.save(userResult);
    }

    public BuyDataDTO getBuyData(String username) {
        BuyDataDTO buyDataDTO = new BuyDataDTO();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UserNoExistException(HttpStatus.NOT_FOUND));
        buyDataDTO.setAddress(user.getAddress());
        buyDataDTO.setEmail(user.getEmail());
        buyDataDTO.setPhone(user.getPhone());
        buyDataDTO.setCity(user.getCity());
        return buyDataDTO;
    }
}
