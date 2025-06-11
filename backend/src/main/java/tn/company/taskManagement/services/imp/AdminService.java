package tn.company.taskManagement.services.imp;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.company.taskManagement.entities.Admin;
import tn.company.taskManagement.entities.Role;
import tn.company.taskManagement.repositories.AdminRepository;
import tn.company.taskManagement.services.email.EmailService;
import tn.company.taskManagement.services.interfaces.AdminServiceInterface;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService implements AdminServiceInterface {
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addAdmin(Admin admin) {
        if (userService.isUsernameTaken(admin.getUsername())) {
            return "Username already in use.";
        }
        if (userService.isEmailTaken(admin.getEmail())) {
            return "Email already in use.";
        }

        String generatedPassword = userService.generateRandomPassword();
        String hashedPassword = passwordEncoder.encode(generatedPassword);
        admin.setPassword(hashedPassword);
        admin.setRole(Role.ADMIN);

        Admin savedAdmin = adminRepository.save(admin);
        emailService.sendUserCredentials(savedAdmin, generatedPassword);
        return "Admin added successfully.";
    }

    @Override
    public String updateAdmin(int id, Admin updatedAdmin) {
        Admin existingAdmin = adminRepository.findById(id)
                .orElse(null);

        if (existingAdmin == null) {
            return "Admin not found.";
        }

        if (!existingAdmin.getUsername().equals(updatedAdmin.getUsername()) &&
                userService.isUsernameTaken(updatedAdmin.getUsername())) {
            return "Username already in use.";
        }
        if (!existingAdmin.getEmail().equals(updatedAdmin.getEmail()) &&
                userService.isEmailTaken(updatedAdmin.getEmail())) {
            return "Email already in use.";
        }

        existingAdmin.setUsername(updatedAdmin.getUsername());
        existingAdmin.setEmail(updatedAdmin.getEmail());
        existingAdmin.setFirstName(updatedAdmin.getFirstName());
        existingAdmin.setLastName(updatedAdmin.getLastName());
        existingAdmin.setRole(updatedAdmin.getRole());
        existingAdmin.setPhoneNumber(updatedAdmin.getPhoneNumber());

        if (!existingAdmin.getPassword().equals(updatedAdmin.getPassword())) {
            String hashedPassword = passwordEncoder.encode(updatedAdmin.getPassword());
            existingAdmin.setPassword(hashedPassword);
        }

        adminRepository.save(existingAdmin);
        return "Admin updated successfully.";
    }

    @Override
    public void deleteAdmin(int adminId) throws EntityNotFoundException {
        Admin admin = adminRepository.findById(adminId).orElse(null);
        if (admin == null) {
            throw new EntityNotFoundException("Admin not found.");
        }
        adminRepository.delete(admin);
    }


    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public Admin getAdminById(int adminId) {
        Optional<Admin> adminOptional = adminRepository.findById(adminId);
        return adminOptional.orElse(null);
    }

}
