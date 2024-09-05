package com.dh.clinicaodontologica.controller;

import com.dh.clinicaodontologica.entity.Odontologo;
import com.dh.clinicaodontologica.exception.MatriculaAlreadyRegisteredException;
import com.dh.clinicaodontologica.exception.ResourceNotFoundException;
import com.dh.clinicaodontologica.service.OdontologoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/odontologos")
public class OdontologoController {
    @Autowired
    private OdontologoService odontologoService;

    @PostMapping
    public ResponseEntity<Odontologo> guardarOdontologo(@RequestBody Odontologo odontologo) throws MatriculaAlreadyRegisteredException {
        if(odontologoService.existeOdontologoConMatricula(odontologo.getMatricula())){
            throw new MatriculaAlreadyRegisteredException();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(odontologoService.guardarOdontologo(odontologo));
    }

    @GetMapping("/buscar-id/{id}")
    public ResponseEntity<Optional<Odontologo>> buscarPorID(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarPorID(id);
        if(!odontologoBuscado.isPresent()){
            throw new ResourceNotFoundException("Odontólogo no encontrado");
        }
        return ResponseEntity.ok(odontologoBuscado);
    }

    @GetMapping("/buscar-matricula/{matricula}")
    public ResponseEntity<Optional<Odontologo>> buscarPorMatricula(@PathVariable String matricula) throws ResourceNotFoundException{
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarPorMatricula(matricula);
        if(!odontologoBuscado.isPresent()){
            throw new ResourceNotFoundException("Odontólogo no encontrado");
        }
        return ResponseEntity.ok(odontologoBuscado);
    }

    @PutMapping
    public ResponseEntity<String> actualizarOdontologo(@RequestBody Odontologo odontologo) throws ResourceNotFoundException, MatriculaAlreadyRegisteredException{
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarPorID(odontologo.getId());
        if (odontologoBuscado.isPresent()) {
            if (odontologoService.existeOdontologoConMatricula(odontologo.getMatricula()) &&
                    !odontologoBuscado.get().getMatricula().equals(odontologo.getMatricula())) {
                throw new MatriculaAlreadyRegisteredException();
            } else {
                odontologoService.actualizarOdontologo(odontologo);
                return ResponseEntity.ok("Odontologo actualizado exitosamente");
            }
        } else {
            throw new ResourceNotFoundException("Odontólogo no encontrado");
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarOdontologo(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarPorID(id);
        if(!odontologoBuscado.isPresent()){
            throw new ResourceNotFoundException("Odontólogo no encontrado");
        }
        odontologoService.eliminarOdontologo(id);
        return ResponseEntity.ok("Odontologo actualizado exitosamente");
    }

    @GetMapping("/listar-todos")
    public ResponseEntity<List<Odontologo>> listarTodos(){
        return ResponseEntity.ok(odontologoService.listarTodos());
    }
}
