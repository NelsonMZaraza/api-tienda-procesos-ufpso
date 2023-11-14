package com.api.ufpso.tienda.service;

import com.api.ufpso.tienda.exception.NotFoundException;
import com.api.ufpso.tienda.model.User;
import com.api.ufpso.tienda.repository.UserRepository;
import com.api.ufpso.tienda.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User userReq){
        return userRepository.save(userReq);

    }
    public User getUserById(Long id){
        if(id == null){
            throw new NotFoundException(Constants.USER_IS_NULL.getMessage());
        }
        Optional<User> user= userRepository.findById(id);
        if(user.isEmpty()){
            throw new NotFoundException(Constants.USER_NOT_FOUND.getMessage());

        }
        return userRepository.findById(id).get();
    }
    public User updateUser(User userReq, Long id){
        Optional<User> userBd=userRepository.findById(id);
        if(userBd.isEmpty()){
            throw new NotFoundException(Constants.USER_NOT_FOUND.getMessage());
        }
        userBd.get().setFirstName(userReq.getFirstName());
        userBd.get().setFirstName(userReq.getFirstName());
        userBd.get().setPhone(userReq.getPhone());
        return userRepository.save(userBd.get());
    }

    public boolean deleteUser(Long id){
        Optional<User> userBd=userRepository.findById(id);
        if(userBd.isEmpty()){
            throw new NotFoundException(Constants.USER_NOT_FOUND.getMessage());
        }
        userRepository.delete(userBd.get());
        return true;
    }

    public List<User> findAllUsers(){
        return (List<User>) userRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository
                .findOneByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("El correo: " + email + "no existe"));
        return new UsersService(user);
    }
}
