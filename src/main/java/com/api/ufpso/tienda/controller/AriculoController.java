package com.api.ufpso.tienda.controller;

import com.api.ufpso.tienda.model.Articulo;
import com.api.ufpso.tienda.service.ArticuloService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AriculoController {
    @Autowired
    private ArticuloService articuloService;

    /*Leer*/
    @GetMapping("articulos/{id}")
    public ResponseEntity<Articulo> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(articuloService.getArticuloById(id));
    }

    /*Crear*/
    @PostMapping("articulos/{idCategoria}")
    public ResponseEntity<Articulo> create(@Valid @RequestBody Articulo articulo, @PathVariable Long idCategoria) {
        return new ResponseEntity<>(articuloService.createArticulo(articulo, idCategoria), HttpStatus.CREATED);
    }

    /*Actualizar*/
    @PutMapping ("articulos/{id}")
    public ResponseEntity<Articulo> update(@Valid @RequestBody Articulo articulo, @PathVariable Long id){
        return new ResponseEntity<>(articuloService.updateArticulo(articulo,id), HttpStatus.OK);
    }

    /*Eliminar*/
    @DeleteMapping("articulos/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        return new ResponseEntity(articuloService.deleteArticulo(id),HttpStatus.NO_CONTENT);
    }

    /*Traer todo*/
    @GetMapping("articulos")
    public ResponseEntity<List<Articulo>> findAll(){
        return ResponseEntity.ok(articuloService.findAllArticulo());
    }
}
