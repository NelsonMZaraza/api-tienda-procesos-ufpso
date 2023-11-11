package com.api.ufpso.tienda.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Categoria {
    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "category name is required")
    @Size(max = 500, message = "category name max 500 characters")
    private String nombreCategoria;
    @NotNull(message = "description is required")
    @Size(max = 800, message = "description max 800 characters")
    private String descripcion;
    @JsonIgnore
    @OneToMany(mappedBy = "categoria")
    List<Articulo> articuloList;
}