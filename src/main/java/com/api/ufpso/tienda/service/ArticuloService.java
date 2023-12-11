package com.api.ufpso.tienda.service;

import com.api.ufpso.tienda.dto.AuthResponse;
import com.api.ufpso.tienda.exception.AlreadyExistsException;
import com.api.ufpso.tienda.exception.NotFoundException;
import com.api.ufpso.tienda.model.Articulo;
import com.api.ufpso.tienda.model.Categoria;
import com.api.ufpso.tienda.model.Role;
import com.api.ufpso.tienda.model.User;
import com.api.ufpso.tienda.repository.ArticuloRepository;
import com.api.ufpso.tienda.util.Constants;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticuloService {
    @Autowired
    private ArticuloRepository articuloRepository;

    @Autowired
    private CategoriaService categoriaService;

    public Articulo createArticulo(Articulo articuloReq, Long idCategoria){
        Categoria categoria = categoriaService.getCategoriaById(idCategoria);
        articuloReq.setCategoria(categoria);
        return articuloRepository.save(articuloReq);
    }

    public Articulo getArticuloById(Long id){
        Optional<Articulo> articulo=articuloRepository.findById(id);
        if (articulo.isEmpty()){
            throw new NotFoundException(Constants.ARTICULO_NOT_FOUND.getMessage());
        }
        return articulo.get();
    }

    public Articulo updateArticulo(Articulo articuloReq, Long id){
        Optional<Articulo> articuloBd = articuloRepository.findById(id);
        if(articuloBd.isEmpty()){
            throw new NotFoundException(Constants.ARTICULO_NOT_FOUND.getMessage());
        }
        articuloBd.get().setNombre(articuloReq.getNombre());
        articuloBd.get().setDescripcion(articuloReq.getDescripcion());
        articuloBd.get().setStock(articuloReq.getStock());
        articuloBd.get().setPrecio(articuloReq.getPrecio());
        articuloBd.get().setFechaIngreso(articuloReq.getFechaIngreso());
        articuloBd.get().setCategoria(articuloReq.getCategoria());
        return articuloRepository.save(articuloBd.get());
    }

    public boolean deleteArticulo(Long id){
        Optional<Articulo> articuloBd = articuloRepository.findById(id);
        if (articuloBd.isEmpty()){
            return false;
        }
        articuloRepository.delete(articuloBd.get());
        return true;
    }

    public List<Articulo> findAllArticulo(){return (List<Articulo>) articuloRepository.findAll();}
}