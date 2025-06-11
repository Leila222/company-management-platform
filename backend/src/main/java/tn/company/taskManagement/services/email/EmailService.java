package tn.company.taskManagement.services.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import tn.company.taskManagement.entities.User;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendUserCredentials(User user, String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Your Account Details");
        message.setText("Dear " + user.getRole() + ",\n\n"
                + "Your account has been created.\n\n"
                + "Username: " + user.getUsername() + "\n"
                + "Password: " + password + "\n\n"
                + "Please keep this information secure.\n\n"
                + "Best regards,\n"
                + "Company Name");

        try {
            emailSender.send(message);
            System.out.println("Email sent successfully to " + user.getEmail());
        } catch (Exception e) {
            System.out.println("Failed to send email to " + user.getEmail() + ": " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void sendEmailInvalidLogin(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        try {
            emailSender.send(message);
            System.out.println("Email sent successfully to " + to);
        } catch (MailException e) {
            System.out.println("Failed to send email to " + to + ": " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void sendUnauthorizedLoginEmail(User user) {
        if (user != null) {
            String subject = "Unauthorized Login Attempts";
            String message = "Dear " + user.getUsername() + ",\n\n"
                    + "We detected unauthorized login attempts on your account. "
                    + "Please contact support if this was not you.";

            sendEmailInvalidLogin(user.getEmail(), subject, message);
        }
    }
}
