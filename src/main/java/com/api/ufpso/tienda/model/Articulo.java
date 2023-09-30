package com.api.ufpso.tienda.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
public class Articulo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY
    )
    private Long id;
    private String nombre;
    private String descripcion;
    private String stock;
    private String precio;
    private String fechaIngreso;
    @ManyToOne
    @JoinColumn(name="articulo_id")
    private Categoria categoria;
}