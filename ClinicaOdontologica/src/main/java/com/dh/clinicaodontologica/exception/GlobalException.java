package com.dh.clinicaodontologica.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalException {
    @ExceptionHandler({ResourceNotFoundException.class})
    public ResponseEntity<?> tratamientoResourceNotFoundException(ResourceNotFoundException ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(HttpStatus.NOT_FOUND, ex.getMessage()));
    }
    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<?> tratamientoBadRequestException(BadRequestException ex){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(HttpStatus.BAD_REQUEST, ex.getMessage()));
    }
    @ExceptionHandler({EmailAlreadyRegisteredException.class})
    public ResponseEntity<?> tratamientoEmailAlreadyRegisteredException(EmailAlreadyRegisteredException ex){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse(HttpStatus.CONFLICT, "El email ya se encuentra registrado"));
    }
    @ExceptionHandler({MatriculaAlreadyRegisteredException.class})
    public ResponseEntity<?> tratamientoMatriculaAlreadyRegisteredException(MatriculaAlreadyRegisteredException ex){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse(HttpStatus.CONFLICT, "La matricula ya se encuentra registrada"));
    }
}
