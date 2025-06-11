package tn.company.taskManagement.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tn.company.taskManagement.entities.User;
import tn.company.taskManagement.repositories.UserRepository;
import tn.company.taskManagement.services.email.EmailService;
import tn.company.taskManagement.util.JwtUtil;
import tn.company.taskManagement.services.imp.UserDetailsServiceImp;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsServiceImp userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    private final Map<String, Integer> loginAttempts = new HashMap<>();

    private static final int MAX_LOGIN_ATTEMPTS = 3;

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            handleIncorrectLoginAttempt(authenticationRequest.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Incorrect username or password");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtUtil.generateToken(userDetails);

        final User userDetailsFromDb = userRepository.findByUsername(authenticationRequest.getUsername());

        resetFailedLoginAttempts(authenticationRequest.getUsername());

        AuthenticationResponse response = new AuthenticationResponse(jwt, userDetailsFromDb.getUserId(), userDetailsFromDb.getRole());
        return ResponseEntity.ok(response);
    }


    private void handleIncorrectLoginAttempt(String username) {
        int attempts = loginAttempts.getOrDefault(username, 0) + 1;
        loginAttempts.put(username, attempts);

        if (attempts >= MAX_LOGIN_ATTEMPTS) {
            User user = userRepository.findByUsername(username);
            emailService.sendUnauthorizedLoginEmail(user);
        }
    }

    private void resetFailedLoginAttempts(String username) {
        loginAttempts.remove(username);
    }
}

