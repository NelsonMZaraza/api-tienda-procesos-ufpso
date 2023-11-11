package com.api.ufpso.tienda.controller;

import com.api.ufpso.tienda.model.Articulo;
import com.api.ufpso.tienda.model.Categoria;
import com.api.ufpso.tienda.service.CategoriaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoriaController {
    @Autowired
    private CategoriaService categoriaService;

    /*Leer*/
    @GetMapping("categorias/{id}")
    public ResponseEntity<Categoria> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(categoriaService.getCategoriaById(id));
    }

    /*Crear*/
    @PostMapping("categorias")
    public ResponseEntity<Categoria> create (@Valid @RequestBody Categoria categoria){
        return new ResponseEntity<>((categoriaService.createCategoria(categoria)), HttpStatus.CREATED);
    }

    /*Actualizar*/
    @PutMapping ("categorias/{id}")
    public ResponseEntity<Categoria> update(@Valid @RequestBody Categoria categoria, @PathVariable Long id){
        return new ResponseEntity<>(categoriaService.updateCategoria(categoria,id), HttpStatus.OK);
    }

    /*Eliminar*/
    @DeleteMapping("categorias/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        return new ResponseEntity(categoriaService.deleteCategoria(id),HttpStatus.NO_CONTENT);
    }

    /*Traer todo*/
    @GetMapping("categorias")
    public ResponseEntity<List<Categoria>> findAll(){
        return ResponseEntity.ok(categoriaService.findAllCategoria());
    }
}