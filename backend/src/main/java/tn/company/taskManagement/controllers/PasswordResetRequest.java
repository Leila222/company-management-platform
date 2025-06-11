package tn.company.taskManagement.controllers;

import lombok.Getter;

@Getter
public class PasswordResetRequest {
    private String phoneNumber;

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
