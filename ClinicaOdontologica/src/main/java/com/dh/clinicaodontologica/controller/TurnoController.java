package com.dh.clinicaodontologica.controller;

import com.dh.clinicaodontologica.entity.Odontologo;
import com.dh.clinicaodontologica.entity.Paciente;
import com.dh.clinicaodontologica.entity.Turno;
import com.dh.clinicaodontologica.exception.BadRequestException;
import com.dh.clinicaodontologica.exception.ResourceNotFoundException;
import com.dh.clinicaodontologica.service.OdontologoService;
import com.dh.clinicaodontologica.service.PacienteService;
import com.dh.clinicaodontologica.service.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/turnos")
public class TurnoController {
    @Autowired
    private TurnoService turnoService;
    @Autowired
    private PacienteService pacienteService;
    @Autowired
    private OdontologoService odontologoService;

    @PostMapping
    public ResponseEntity<?> guardarTurno(@RequestBody Turno turno) throws BadRequestException {
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPorID(turno.getPaciente().getId());
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarPorID(turno.getOdontologo().getId());
        if (!pacienteBuscado.isPresent()) {
            throw new BadRequestException("No se encontró al paciente");
        }
        if (!odontologoBuscado.isPresent()) {
            throw new BadRequestException("No se encontró al odontólogo");
        }
        turno.setPaciente(pacienteBuscado.get());
        turno.setOdontologo(odontologoBuscado.get());
        return ResponseEntity.status(HttpStatus.CREATED).body(turnoService.guardarTurno(turno));
    }

    @GetMapping("/buscar-id/{id}")
    public ResponseEntity<Optional<Turno>> buscarPorID(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Turno> turnoBuscado = turnoService.buscarPorID(id);
        if(turnoBuscado.isPresent()){
            return ResponseEntity.ok(turnoService.buscarPorID(id));
        }else{
            throw new ResourceNotFoundException("Turno no encontrado");
        }
    }

    @PutMapping
    public ResponseEntity<?> actualizarTurno(@RequestBody Turno turno) throws ResourceNotFoundException {
        Optional<Turno> turnoBuscado = turnoService.buscarPorID(turno.getId());
        if (turnoBuscado.isPresent()) {
            turnoService.actualizarTurno(turno);
            return ResponseEntity.ok("Turno actualizado correctamente");
        } else {
            throw new ResourceNotFoundException("Turno no encontrado");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarTurno(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Turno> turnoBuscado = turnoService.buscarPorID(id);
        if(turnoBuscado.isPresent()){
            turnoService.eliminarTurno(id);
            return ResponseEntity.ok("Turno eliminado exitosamente");
        }else{
            throw new ResourceNotFoundException("Turno no encontrado");
        }
    }

    @GetMapping("/listar-todos")
    public ResponseEntity<List<Turno>> listarTodos(){
        return ResponseEntity.ok(turnoService.listarTodos());
    }

}
