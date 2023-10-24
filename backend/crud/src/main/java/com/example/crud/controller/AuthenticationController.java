package com.example.crud.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.crud.config.TokenService;
import com.example.crud.user.AuthenticationDTO;
import com.example.crud.user.LoginResponseDTO;
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
    private RegisterDTO registerDTO;

    @Autowired
    private TokenService tokenService;

    @CrossOrigin(origins = "*")
    @PostMapping("auth/login")
    public ResponseEntity login(@RequestBody @Validated AuthenticationDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token, data.email()));
    }

    @CrossOrigin(origins = "*")
    @PostMapping("auth/register")
    public ResponseEntity register(@RequestBody @Validated RegisterDTO data) {
        if (userRepository.findByEmail(data.email()) != null) {
            return ResponseEntity.badRequest().build();
        }
        ;

        if (data.password().equals(data.confirmPassword()) && data.password().length() > 0
                && data.email().matches(".*@.*\\.com.*?")) {
            String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
            User newUser = new User(data.email(), encryptedPassword);
            userRepository.save(newUser);

            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @CrossOrigin(origins = "*")
    @PostMapping("auth/user-exists")
    public ResponseEntity<Boolean> userExists(@RequestBody RegisterDTO data) {
        UserDetails user = userRepository.findByEmail(data.email());
        boolean userExists = user != null;
        return new ResponseEntity<>(userExists, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("users")
    public List<User> getUsers() {
        List<User> users = userRepository.findAll();
        return users;
    }
}
