package tarea4.tarea4.repositories;

import tarea4.tarea4.models.Region;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepository extends JpaRepository<Region, Integer> {
}