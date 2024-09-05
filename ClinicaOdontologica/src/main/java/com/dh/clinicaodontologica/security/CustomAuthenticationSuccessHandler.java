package com.dh.clinicaodontologica.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.util.Collection;


public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        Collection<SimpleGrantedAuthority> authorities = (Collection<SimpleGrantedAuthority>) authentication.getAuthorities();
        boolean isUser = authorities.stream().anyMatch(r -> r.getAuthority().equals("ROLE_USER"));
        boolean isAdmin = authorities.stream().anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"));

        if(isUser){
            response.sendRedirect("/turnos.html");
        }else if(isAdmin){
            response.sendRedirect("/index.html");
        }else{
            response.sendRedirect("/login.html");
        }
    }
}
