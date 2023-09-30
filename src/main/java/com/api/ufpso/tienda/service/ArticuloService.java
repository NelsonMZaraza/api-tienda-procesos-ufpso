package com.api.ufpso.tienda.service;

import com.api.ufpso.tienda.model.Articulo;
import com.api.ufpso.tienda.repository.ArticuloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Optional;

@Service
public class ArticuloService {
    @Autowired
    private ArticuloRepository articuloRepository;

    public Articulo createArticulo(Articulo articuloReq){
        return articuloRepository.save(articuloReq);
    }
    public Articulo getArticuloById(Long id){
        return articuloRepository.findById(id).get();
    }

    public Articulo updateArticulo(Articulo articuloReq, Long id){
        Optional<Articulo> articuloBd = articuloRepository.findById(id);
        if(articuloBd.isEmpty()){
            return null;
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
