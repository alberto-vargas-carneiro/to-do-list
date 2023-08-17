package com.example.crud.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.crud.user.AuthenticationDTO;
import com.example.crud.user.RegisterDTO;
import com.example.crud.user.User;
import com.example.crud.user.UserRepository;

@RestController
@RequestMapping
public class AuthenticationController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("auth/login")
    public ResponseEntity login(@RequestBody @Validated AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = authenticationManager.authenticate(usernamePassword);

        return ResponseEntity.ok().build();
    }

    @PostMapping("auth/register")
    public ResponseEntity register(@RequestBody @Validated RegisterDTO data){
        if (userRepository.findByEmail(data.email()) != null) {
            return ResponseEntity.badRequest().build();
        };
            
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.email(), encryptedPassword);
        userRepository.save(newUser);

        return ResponseEntity.ok().build();
    }

    @GetMapping("users")
    public List<User> getUsers(){
        List<User> users = userRepository.findAll();
        return users;
    }
}
