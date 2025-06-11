package tn.company.taskManagement.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.company.taskManagement.entities.User;
import tn.company.taskManagement.services.imp.UserService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        User user = userService.getUserById(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateUser(@PathVariable int id, @RequestBody User user) {
        String responseMessage = userService.handleUserUpdate(id, user);
        if (responseMessage.equals("User updated successfully.")) {
            return ResponseEntity.ok(responseMessage);
        } else if (responseMessage.equals("User not found.")) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.badRequest().body(responseMessage);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update-password/{userId}")
    public ResponseEntity<String> updatePassword(@PathVariable int userId, @RequestBody UserService.PasswordChangeDTO passwordChangeDTO) {
        String response = userService.updatePassword(userId, passwordChangeDTO);
        if (response.equals("Password updated successfully")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }
}
