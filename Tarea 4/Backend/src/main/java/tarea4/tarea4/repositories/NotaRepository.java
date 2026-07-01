package tarea4.tarea4.repositories;

import tarea4.tarea4.models.Nota;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotaRepository extends JpaRepository<Nota, Integer> {
}