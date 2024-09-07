package com.dh.clinicaodontologica.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.dh.clinicaodontologica.entity.Usuario;
import com.dh.clinicaodontologica.entity.UsuarioRole;
import com.dh.clinicaodontologica.repository.UsuarioRepository;

@Component
public class DatosIniciales implements ApplicationRunner {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        String passSinCifrar = "user";
        String passCifrado = passwordEncoder.encode(passSinCifrar);
        Usuario user = new Usuario("Abc", "user", "abc@gmail.com", passCifrado, UsuarioRole.ROLE_USER);
        usuarioRepository.save(user);


        String passSinCifrarA = "admin";
        String passCifradoA = passwordEncoder.encode(passSinCifrarA);
        Usuario carlos = new Usuario("Carlos Portillo", "carportillo", "carlosportillo@gmail.com", passCifradoA,
                UsuarioRole.ROLE_ADMIN);
        Usuario francisco = new Usuario("Francisco Portillo", "franciscoport", "franciscoportillo@gmail.com", passCifradoA, UsuarioRole.ROLE_ADMIN);
        Usuario daniel = new Usuario("Daniel Alvarado", "danielalv", "danielalvarado@gmail.com", passCifradoA, UsuarioRole.ROLE_ADMIN);
        usuarioRepository.save(francisco);
        usuarioRepository.save(daniel);
        usuarioRepository.save(carlos);

    }
}