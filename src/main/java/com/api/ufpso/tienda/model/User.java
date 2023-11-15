package com.api.ufpso.tienda.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
 
import java.util.List;

@Data
@Entity
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "firstname is required")
    @Size(max = 255, message = "firstname max 255 characters")
    private String firstName;

    @NotNull(message = "lastname is required")
    @Size(max = 255, message = "lastname max 255 characters")
    private String lastName;

    @NotNull(message = "document is required")
    @Size(min=5, max=15, message = "document min 5 characters and max 15")
    private String document;

    @NotNull(message = "Phone number is required")
    @Size(min=10, max = 10, message = "phone with 10 characters")
    private String phone;

    @NotNull(message = "email is required")
    @Email(message = "email not valid")
    private String email;

    @NotNull(message = "password is required")
    @Size(min=8,max = 150, message = "password min 8 characters and max 150")
    private String password;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    List<Address>addressList;

}
