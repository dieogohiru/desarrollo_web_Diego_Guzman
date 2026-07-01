package tarea4.tarea4.repositories;

import tarea4.tarea4.models.Comuna;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComunaRepository extends JpaRepository<Comuna, Integer> {
    List<Comuna> findByRegionId(Integer regionId);
}