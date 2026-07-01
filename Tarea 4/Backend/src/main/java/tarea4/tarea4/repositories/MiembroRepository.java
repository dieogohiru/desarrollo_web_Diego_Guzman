package tarea4.tarea4.repositories;

import tarea4.tarea4.models.Miembro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MiembroRepository extends JpaRepository<Miembro, Integer> {
    
    Miembro findByEmail(String email);
    
    Miembro findByTelefono(String telefono);
    
    Page<Miembro> findByNombreContainingIgnoreCaseAndComunaId(String nombre, Integer comunaId, Pageable pageable);
    
    Page<Miembro> findByNombreContainingIgnoreCase(String nombre, Pageable pageable);
}