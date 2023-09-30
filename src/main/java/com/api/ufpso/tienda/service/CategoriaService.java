package com.api.ufpso.tienda.service;

import com.api.ufpso.tienda.model.Categoria;
import com.api.ufpso.tienda.repository.CategoriaRepository;
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
        return categoriaRepository.findById(id).get();
    }

    public Categoria updateCategoria(Categoria categoriaReq, Long id){
        Optional<Categoria> categoriaBd = categoriaRepository.findById(id);
        if(categoriaBd.isEmpty()){
            return null;
        }
        categoriaBd.get().setNombreCategoria(categoriaReq.getNombreCategoria());
        categoriaBd.get().setDescripcion(categoriaReq.getDescripcion());
        return categoriaRepository.save(categoriaBd.get());
    }

    public boolean deleteCategoria(Long id){
        Optional<Categoria> categoriaBd = categoriaRepository.findById(id);
        if (categoriaBd.isEmpty()){
            return false;
        }
        categoriaRepository.delete(categoriaBd.get());
        return true;
    }

    public List<Categoria> findAllCategoria(){return (List<Categoria>) categoriaRepository.findAll();}
}
