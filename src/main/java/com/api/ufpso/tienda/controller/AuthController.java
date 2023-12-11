package com.api.ufpso.tienda.controller;

import com.api.ufpso.tienda.dto.AuthResponse;
import com.api.ufpso.tienda.dto.LoginRequest;
import com.api.ufpso.tienda.model.User;
import com.api.ufpso.tienda.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping(value = "login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request){
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping(value = "register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody User request){
        return ResponseEntity.ok(authService.register(request));
    }
}
