package com.api.ufpso.tienda.auth;

import lombok.Data;

@Data
public class AuthCredentials {
    private String email;
    private String password;
}
