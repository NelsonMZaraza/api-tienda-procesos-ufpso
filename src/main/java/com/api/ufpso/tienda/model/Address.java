package com.api.ufpso.tienda.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "street Address is required")
    @Size(max = 255, message = "street Address max 255 characters")
    private String streetAddress;

    @NotNull(message = "city is required")
    @Size(max = 255, message = "city max 255 characters")
    private String city;

    @NotNull(message = "state is required")
    @Size(max = 100, message = "sate max 100 characters")
    private String state;

    @NotNull(message = "postal code is required")
    @Size(max = 10, message = "postal code max 10 characters")
    private String postalCode;

    private Boolean status=Boolean.TRUE;
    @ManyToOne
    @JoinColumn(name="id_user",referencedColumnName = "id")
    private User user;


}
