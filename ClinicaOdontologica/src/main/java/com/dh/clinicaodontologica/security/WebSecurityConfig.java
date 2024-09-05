package com.dh.clinicaodontologica.security;

import com.dh.clinicaodontologica.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity //Con esto postman ya no funciona. Requiere que este autenticado.
public class WebSecurityConfig {
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    //Proveedor de autenticaciones
    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(){
        //Aca viene el usuario y desencriptador de claves
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(usuarioService);
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        return provider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authz) -> authz
                        //API para obtener los datos del usuario autenticado
                        .requestMatchers("/api/userinfo").authenticated()
                        // Rutas que permiten acceso público
                        .requestMatchers("/src/assets/**", "/src/components/**", "/src/styles/**").permitAll()
                        // Rutas que requieren rol USER
                        .requestMatchers(
                                "/turnos.html",
                                "/turnos/listar-todos",
                                "/turnos/buscar-id/**",
                                "/turnos",
                                "/src/js/turnos/get_turnos.js",
                                "/src/js/turnos/post_turnos.js",
                                "/src/components/listaOdontologosPacientes.js",
                                "/pacientes/listar-todos",
                                "/odontologos/listar-todos").hasAnyRole("USER",
                                "ADMIN")
                        // Rutas que requieren rol ADMIN
                        .requestMatchers("/index.html", "/odontologos.html", "/pacientes.html",
                                "/src/js/turnos/delete_turnos.js",
                                "/src/js/turnos/update_turnos.js",
                                "/pacientes",
                                "/pacientes/**",
                                "/odontologos/**",
                                "/odontologos",
                                "/turnos/**",
                                "/turnos").hasRole(
                                "ADMIN")
                        // Cualquier otra ruta requiere autenticación
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/login.html")
                        .loginProcessingUrl("/login")
                        .failureUrl("/login.html?error=true")
                        .successHandler(new CustomAuthenticationSuccessHandler())
                        .permitAll()
                )
                .logout(Customizer.withDefaults())
                .exceptionHandling(exception -> exception
                        .accessDeniedPage("/403.html"));
        return http.build();

    }

}
