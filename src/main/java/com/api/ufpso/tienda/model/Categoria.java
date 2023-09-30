package com.api.ufpso.tienda.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
@Entity
public class Categoria {
    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String nombreCategoria;
    private String descripcion;
    @OneToMany(mappedBy = "categoria")
    private Set<Articulo> articulos;
}