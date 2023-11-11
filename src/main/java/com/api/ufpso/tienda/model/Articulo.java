package com.api.ufpso.tienda.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

@Data
@Entity
public class Articulo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "firstname is required")
    @Size(max = 255, message = "firstname max 255 characters")
    private String nombre;

    @NotNull(message = "description is required")
    @Size(max = 255, message = "description max 800 characters")
    private String descripcion;

    @NotNull(message = "stock is required")
    private String stock;

    @NotNull(message = "price is required")
    private String precio;

    @NotNull(message = "fecha Ingreso is required")
    private String fechaIngreso;

    @ManyToOne
    @JoinColumn(name="articulo_id", referencedColumnName = "id")
    private Categoria categoria;
}