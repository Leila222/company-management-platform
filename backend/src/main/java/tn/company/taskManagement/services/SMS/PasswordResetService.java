package tn.company.taskManagement.services.SMS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.company.taskManagement.entities.User;
import tn.company.taskManagement.repositories.UserRepository;

import java.time.LocalDateTime;

@Service
public class PasswordResetService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenService tokenService;

    @Autowired
    private SmsService smsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void initiatePasswordReset(String phoneNumber) {
        User user = userRepository.findByPhoneNumber(phoneNumber);
        if (user == null) {
            throw new IllegalArgumentException("User not found with phone number: " + phoneNumber);
        }

        String code = tokenService.generateCode();
        tokenService.storeToken(code, phoneNumber);

        String message = "Your password reset code is: " + code + ". Use this code to reset your password.";
        smsService.sendSms(phoneNumber, message);
    }

    public void resetPassword(String code, String newPassword) {
        PasswordResetTokenService.PasswordResetToken passwordResetToken = tokenService.retrieveToken(code);
        if (passwordResetToken == null || passwordResetToken.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Invalid or expired code.");
        }

        User user = userRepository.findByPhoneNumber(passwordResetToken.getPhoneNumber());
        if (user == null) {
            throw new IllegalArgumentException("User not found with phone number: " + passwordResetToken.getPhoneNumber());
        }

        // Update user's password
        String hashedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(hashedPassword);
        userRepository.save(user);

        // Remove the code after successful password reset
        tokenService.removeToken(code);
    }
}
