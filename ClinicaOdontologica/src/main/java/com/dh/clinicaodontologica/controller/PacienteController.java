package com.dh.clinicaodontologica.controller;

import com.dh.clinicaodontologica.entity.Paciente;
import com.dh.clinicaodontologica.exception.EmailAlreadyRegisteredException;
import com.dh.clinicaodontologica.exception.ResourceNotFoundException;
import com.dh.clinicaodontologica.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {
    @Autowired
    private PacienteService pacienteService;

    @PostMapping
    public ResponseEntity<?> guardarPaciente(@RequestBody Paciente paciente) throws EmailAlreadyRegisteredException {
        if (pacienteService.existePacienteConEmail(paciente.getEmail())) {
            throw new EmailAlreadyRegisteredException();
        } else {
            Paciente pacienteGuardado = pacienteService.guardarPaciente(paciente);
            return ResponseEntity.status(HttpStatus.CREATED).body(pacienteGuardado);
        }
    }

    @GetMapping("/buscar-id/{id}")
    public ResponseEntity<Optional<Paciente>> buscarPaciente(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPorID(id);
        if(!pacienteBuscado.isPresent()){
            throw new ResourceNotFoundException("Paciente no encontrado");
        }
        return ResponseEntity.ok(pacienteBuscado);
    }

    @GetMapping("/buscar-email/{email}")
    public ResponseEntity<?> buscarPorEmail(@PathVariable String email) throws ResourceNotFoundException{
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPorEmail(email);
        if(!pacienteBuscado.isPresent()){
            throw new ResourceNotFoundException("Paciente no encontrado");
        }
        return ResponseEntity.ok(pacienteService.buscarPorEmail(email));
    }

    @PutMapping
    public ResponseEntity<String> actualizarPaciente(@RequestBody Paciente paciente) throws ResourceNotFoundException, EmailAlreadyRegisteredException {
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPorID(paciente.getId());
        if (pacienteBuscado.isPresent()) {
            if (pacienteService.existePacienteConEmail(paciente.getEmail()) &&
                    !pacienteBuscado.get().getEmail().equals(paciente.getEmail())) {
                throw new EmailAlreadyRegisteredException();
            } else {
                pacienteService.actualizarPaciente(paciente);
                return ResponseEntity.ok("Paciente actualizado con éxito");
            }
        } else {
            throw new ResourceNotFoundException("Paciente no encontrado");
        }

    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarPaciente(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPorID(id);
        if(!pacienteBuscado.isPresent()){
            throw new ResourceNotFoundException("Paciente no encontrado");
        }
        pacienteService.eliminarPaciente(id);
        return ResponseEntity.ok("Paciente eliminado con éxito");
    }

    @GetMapping("/listar-todos")
    public ResponseEntity<List<Paciente>> listarTodos() {
        return ResponseEntity.ok(pacienteService.listarTodos());
    }


}
