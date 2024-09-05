package com.dh.clinicaodontologica.controller;

import com.dh.clinicaodontologica.dto.UsuarioDTO;
import com.dh.clinicaodontologica.entity.Usuario;
import com.dh.clinicaodontologica.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class UsuarioController{

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/api/userinfo")
    public Object getUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Optional<Usuario> usuarioBuscado = usuarioService.buscarUsuarioPorUserName(userDetails.getUsername());
            UsuarioDTO usuarioDTO = new UsuarioDTO(usuarioBuscado.get().getNombre(), usuarioBuscado.get().getEmail());
            return usuarioDTO;
        }else {
            return null;
        }
    }
}
