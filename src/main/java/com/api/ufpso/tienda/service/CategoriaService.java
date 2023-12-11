package com.api.ufpso.tienda.service;

import com.api.ufpso.tienda.exception.NotFoundException;
import com.api.ufpso.tienda.model.Categoria;
import com.api.ufpso.tienda.repository.CategoriaRepository;
import com.api.ufpso.tienda.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    public Categoria createCategoria(Categoria categoriaReq){
        return categoriaRepository.save(categoriaReq);
    }

    public Categoria getCategoriaById(Long id){
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        if (categoria.isEmpty()){
            throw new NotFoundException(Constants.CATEGORIA_NOT_FOUND.getMessage());
        }
        return categoria.get();
    }

    public Categoria updateCategoria(Categoria categoriaReq, Long id){
        Optional<Categoria> categoriaBd = categoriaRepository.findById(id);
        if(categoriaBd.isEmpty()){
            throw new NotFoundException(Constants.CATEGORIA_NOT_FOUND.getMessage());
        }
        categoriaBd.get().setNombreCategoria(categoriaReq.getNombreCategoria());
        categoriaBd.get().setDescripcion(categoriaReq.getDescripcion());
        return categoriaRepository.save(categoriaBd.get());
    }

    public boolean deleteCategoria(Long id){
        Optional<Categoria> categoriaBd = categoriaRepository.findById(id);
        if (categoriaBd.isEmpty()){
            throw new NotFoundException(Constants.CATEGORIA_NOT_FOUND.getMessage());
        }
        categoriaRepository.delete(categoriaBd.get());
        return true;
    }

    public List<Categoria> findAllCategoria(){return (List<Categoria>) categoriaRepository.findAll();}
}