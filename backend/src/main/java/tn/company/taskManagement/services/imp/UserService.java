package tn.company.taskManagement.services.imp;

import jakarta.persistence.EntityNotFoundException;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.company.taskManagement.entities.Admin;
import tn.company.taskManagement.entities.Employee;
import tn.company.taskManagement.entities.ProjectManager;
import tn.company.taskManagement.entities.User;
import tn.company.taskManagement.repositories.AdminRepository;
import tn.company.taskManagement.repositories.EmployeeRepository;
import tn.company.taskManagement.repositories.ProjectManagerRepository;
import tn.company.taskManagement.repositories.UserRepository;
import tn.company.taskManagement.services.interfaces.UserServiceInterface;

import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;

import tn.company.taskManagement.entities.Role;


@Service
public class UserService implements UserServiceInterface {

    @Getter
    @Setter
    public static class PasswordChangeDTO {
        private String currentPassword;
        private String newPassword;
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ProjectManagerRepository projectManagerRepository;

    @Override
    public boolean isUsernameTaken(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean isEmailTaken(String email) {
        return userRepository.existsByEmail(email);
    }

    public String generateRandomPassword() {
        int passwordLength = 12;
        String charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+<>?";

        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder(passwordLength);

        for (int i = 0; i < passwordLength; i++) {
            int randomIndex = random.nextInt(charSet.length());
            password.append(charSet.charAt(randomIndex));
        }

        return password.toString();
    }

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    @Override
    public User getUserById(int id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    public String handleUserUpdate(int id, User user) {
        Optional<User> existingUserOpt = userRepository.findById(id);

        if (existingUserOpt.isEmpty()) {
            return "User not found.";
        }

        User existingUser = existingUserOpt.get();

        if (!existingUser.getUsername().equals(user.getUsername()) &&
                isUsernameTaken(user.getUsername())) {
            return "Username already in use.";
        }

        if (!existingUser.getEmail().equals(user.getEmail()) &&
                isEmailTaken(user.getEmail())) {
            return "Email already in use.";
        }

        if (existingUser.getRole().equals(user.getRole())) {
            updateUserInRoleTable(id, user, existingUser.getRole());
        } else {
            deleteUserFromRoleTable(id, existingUser.getRole());
            user.setUserId(id);
            saveUserToRoleTable(user);
        }
        return "User updated successfully.";
    }

    private void deleteUserFromRoleTable(int id, Role role) {
        switch (role) {
            case EMPLOYEE:
                employeeRepository.deleteById(id);
                break;
            case PROJECT_MANAGER:
                projectManagerRepository.deleteById(id);
                break;
            case ADMIN:
                adminRepository.deleteById(id);
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + role);
        }
    }

    private void saveUserToRoleTable(User user) {
        switch (user.getRole()) {
            case EMPLOYEE:
                Employee employee = new Employee();
                copyCommonFields(user, employee);
                employee.setUserId(user.getUserId());
                employeeRepository.save(employee);
                return;
            case PROJECT_MANAGER:
                ProjectManager projectManager = new ProjectManager();
                copyCommonFields(user, projectManager);
                projectManager.setUserId(user.getUserId());
                projectManagerRepository.save(projectManager);
                return;
            case ADMIN:
                Admin admin = new Admin();
                copyCommonFields(user, admin);
                admin.setUserId(user.getUserId());
                adminRepository.save(admin);
                return;
            default:
                throw new IllegalStateException("Unexpected value: " + user.getRole());
        }
    }

    private void updateUserInRoleTable(int id, User user, Role role) {
        switch (role) {
            case EMPLOYEE:
                Employee existingEmployee = employeeRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("User not found!"));
                copyCommonFields(user, existingEmployee);
                employeeRepository.save(existingEmployee);
                return;

            case PROJECT_MANAGER:
                ProjectManager existingManager = (ProjectManager) projectManagerRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("User not found!"));
                copyCommonFields(user, existingManager);
                projectManagerRepository.save(existingManager);
                return;

            case ADMIN:
                Admin existingAdmin = (Admin) adminRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("User not found!"));
                copyCommonFields(user, existingAdmin);
                adminRepository.save(existingAdmin);
                return;

            default:
                throw new IllegalStateException("Unexpected value: " + role);
        }
    }

    private void copyCommonFields(User source, User target) {
        target.setUsername(source.getUsername());
        target.setPassword(source.getPassword());
        target.setEmail(source.getEmail());
        target.setFirstName(source.getFirstName());
        target.setLastName(source.getLastName());
        target.setRole(source.getRole());
        target.setPhoneNumber(source.getPhoneNumber());
    }

    @Override
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    public String updatePassword(int userId, PasswordChangeDTO passwordChangeDTO) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(passwordChangeDTO.getCurrentPassword(), user.getPassword())) {
            return "Current password is incorrect";
        }

        user.setPassword(passwordEncoder.encode(passwordChangeDTO.getNewPassword()));
        userRepository.save(user);

        return "Password updated successfully";
    }
}
