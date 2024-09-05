package com.dh.clinicaodontologica.service;

import com.dh.clinicaodontologica.entity.Odontologo;
import com.dh.clinicaodontologica.repository.OdontologoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OdontologoService {

    @Autowired
    private OdontologoRepository odontologoRepository;

    public Odontologo guardarOdontologo(Odontologo odontologo){
        return odontologoRepository.save(odontologo);
    }

    public Optional<Odontologo> buscarPorID(Long id){
        return odontologoRepository.findById(id);
    }

    public Optional<Odontologo> buscarPorMatricula(String matricula){
        return odontologoRepository.findByMatricula(matricula);
    }

    public void actualizarOdontologo(Odontologo odontologo){
        odontologoRepository.save(odontologo);
    }

    public void eliminarOdontologo(Long id){
        odontologoRepository.deleteById(id);
    }

    public List<Odontologo> listarTodos(){
        return odontologoRepository.findAll();
    }

    public Boolean existeOdontologoConMatricula(String matricula){
        return odontologoRepository.existsOdontologoByMatricula(matricula);
    }

}
