package tarea4.tarea4.controllers;

import tarea4.tarea4.repositories.ActividadRepository;
import tarea4.tarea4.models.Actividad;
import tarea4.tarea4.models.Nota;            
import tarea4.tarea4.repositories.NotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/actividades")
public class ActividadRestController {

    @Autowired
    private ActividadRepository actividadRepository;

    @Autowired
    private NotaRepository notaRepository;

    @GetMapping("/buscar")
    public List<Map<String, Object>> buscar(@RequestParam(required = false) String texto) {
        List<Actividad> actividades;
        if (texto == null || texto.isEmpty()) {
            actividades = actividadRepository.findAll();
        } else {
            actividades = actividadRepository.buscarPorFiltro(texto);
        }

        List<Map<String, Object>> respuesta = new ArrayList<>();

        for (Actividad act : actividades) {
            Map<String, Object> dto = new HashMap<>();
            dto.put("id", act.getId());
            dto.put("nombre", act.getNombre());
            dto.put("tipo", act.getTipo());
            dto.put("dia", act.getDia());
            dto.put("horaInicio", act.getHoraInicio());
            dto.put("descripcion", act.getDescripcion());
            dto.put("miembro", act.getMiembro());

            Double promedioHistorico = actividadRepository.obtenerPromedioNotas(act.getId());
            dto.put("promedioInicial", (promedioHistorico != null && promedioHistorico > 0) ? promedioHistorico : null);

            respuesta.add(dto);
        }

        return respuesta;
    }

    @PostMapping("/{id}/evaluar")
    public ResponseEntity<?> agregarNota(@PathVariable Integer id, @RequestParam Integer valor) {
        if (valor < 1 || valor > 7) {
            return ResponseEntity.badRequest().body("La nota debe ser entre 1 y 7");
        }
        
        Actividad act = actividadRepository.findById(id).orElse(null);
        if (act == null) {
            return ResponseEntity.notFound().build();
        }
        
        Nota nuevaNota = new Nota();
        nuevaNota.setValor(valor);
        nuevaNota.setActividad(act);
        notaRepository.save(nuevaNota);
        
        Double promedio = actividadRepository.obtenerPromedioNotas(id);
        
        Map<String, Double> respuesta = new HashMap<>();
        respuesta.put("nuevoPromedio", promedio);
        
        return ResponseEntity.ok(respuesta);
    }
}