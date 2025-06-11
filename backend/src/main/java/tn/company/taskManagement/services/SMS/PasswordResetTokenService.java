package tn.company.taskManagement.services.SMS;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

@Service
public class PasswordResetTokenService {

    private static final int CODE_LENGTH = 6;
    private static final long EXPIRATION_MINUTES = 15;

    private final SecureRandom secureRandom = new SecureRandom();
    private final Map<String, PasswordResetToken> tokenStore = new HashMap<>();

    public String generateCode() {
        int code = secureRandom.nextInt((int) Math.pow(10, CODE_LENGTH));
        return String.format("%0" + CODE_LENGTH + "d", code);
    }

    public void storeToken(String code, String phoneNumber) {
        LocalDateTime expiryTime = LocalDateTime.now().plus(EXPIRATION_MINUTES, ChronoUnit.MINUTES);
        tokenStore.put(code, new PasswordResetToken(phoneNumber, expiryTime));
    }

    public PasswordResetToken retrieveToken(String code) {
        return tokenStore.get(code);
    }

    public void removeToken(String code) {
        tokenStore.remove(code);
    }

    public static class PasswordResetToken {
        private final String phoneNumber;
        private final LocalDateTime expiryTime;

        public PasswordResetToken(String phoneNumber, LocalDateTime expiryTime) {
            this.phoneNumber = phoneNumber;
            this.expiryTime = expiryTime;
        }

        public String getPhoneNumber() {
            return phoneNumber;
        }

        public LocalDateTime getExpiryTime() {
            return expiryTime;
        }
    }
}
