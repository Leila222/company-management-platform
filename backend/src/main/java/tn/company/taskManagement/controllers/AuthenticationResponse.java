package tn.company.taskManagement.controllers;

import lombok.Data;
import tn.company.taskManagement.entities.Role;

import java.io.Serializable;

@Data
public class AuthenticationResponse implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwt;
    private final int userId;
    private final Role role;
    public AuthenticationResponse(String jwt, int userId, Role role) {
        this.jwt = jwt;
        this.userId = userId;
        this.role = role;

    }
}


