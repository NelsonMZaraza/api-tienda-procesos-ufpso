package com.api.ufpso.tienda.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Categoria {
    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String nombreCategoria;
    private String descripcion;
    @OneToMany(mappedBy = "categoria")
    private List<Articulo> articuloList;
}
