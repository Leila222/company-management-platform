package tn.company.taskManagement.controllers;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import tn.company.taskManagement.entities.Admin;
import tn.company.taskManagement.services.imp.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    @PostMapping("/add")
    public ResponseEntity<String> addAdmin(@RequestBody Admin admin) {
        String responseMessage = adminService.addAdmin(admin);
        if (responseMessage.equals("Admin added successfully.")) {
            return new ResponseEntity<>(responseMessage, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(responseMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateAdmin(@PathVariable int id, @RequestBody Admin admin) {
        String responseMessage = adminService.updateAdmin(id, admin);
        if (responseMessage.equals("Admin updated successfully.")) {
            return new ResponseEntity<>(responseMessage, HttpStatus.OK);
        } else if (responseMessage.equals("Admin not found.")) {
            return new ResponseEntity<>(responseMessage, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(responseMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAdmin(@PathVariable int id) {
        try {
            adminService.deleteAdmin(id);
            return new ResponseEntity<>("Admin deleted successfully.", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all")
    public List<Admin> getAllAdmins() {

        return adminService.getAllAdmins();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getAdminById(@PathVariable int id) {
        Admin admin = adminService.getAdminById(id);
        if (admin != null) {
            return ResponseEntity.ok(admin);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
