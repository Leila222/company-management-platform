package tn.company.taskManagement.controllers;


import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.company.taskManagement.services.SMS.PasswordResetService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/reset-password")
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    @PostMapping
    public ResponseEntity<String> initiatePasswordReset(@RequestBody PasswordResetRequest request) {
        String phoneNumber = "+216" + request.getPhoneNumber();
        passwordResetService.initiatePasswordReset(phoneNumber);
        return ResponseEntity.ok("Password reset initiated. Check your SMS for instructions.");
    }


    @PostMapping("/confirm")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
        passwordResetService.resetPassword(resetPasswordRequest.getToken(), resetPasswordRequest.getNewPassword());
        return ResponseEntity.ok("Password reset successfully.");
    }

    @Getter
    @Setter
    public static class ResetPasswordRequest {
        private String token;
        private String newPassword;
    }
}

