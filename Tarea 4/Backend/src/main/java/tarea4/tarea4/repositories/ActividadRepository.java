package tarea4.tarea4.repositories;

import tarea4.tarea4.models.Actividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ActividadRepository extends JpaRepository<Actividad, Integer> {
    @Query("SELECT a FROM Actividad a JOIN a.miembro m JOIN m.comuna c " +
           "WHERE LOWER(a.nombre) LIKE LOWER(CONCAT('%', :texto, '%')) " +
           "OR LOWER(a.descripcion) LIKE LOWER(CONCAT('%', :texto, '%')) " +
           "OR LOWER(c.nombre) LIKE LOWER(CONCAT('%', :texto, '%'))")
    List<Actividad> buscarPorFiltro(@Param("texto") String texto);

    @Query(value = "SELECT tipo, COUNT(*) as total FROM actividad GROUP BY tipo", nativeQuery = true)
    List<Object[]> getStatsActividadesPorTipo();

    @Query(value = "SELECT c.nombre, COUNT(a.id) as total FROM actividad a INNER JOIN miembro m ON a.miembro_id = m.id INNER JOIN comuna c ON m.comuna_id = c.id GROUP BY c.id, c.nombre ORDER BY total DESC", nativeQuery = true)
    List<Object[]> getStatsActividadesPorComuna();

    @Query(value = "SELECT COALESCE(AVG(nota), 0.0) FROM nota WHERE actividad_id = :actividadId", nativeQuery = true)
    Double obtenerPromedioNotas(@Param("actividadId") Integer actividadId);
}