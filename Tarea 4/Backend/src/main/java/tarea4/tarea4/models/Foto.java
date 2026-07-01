package tarea4.tarea4.models;

import jakarta.persistence.*;

@Entity
@Table(name = "foto")
public class Foto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ruta_archivo", length = 300, nullable = false)
    private String rutaArchivo;

    @Column(name = "nombre_archivo", length = 300, nullable = false)
    private String nombreArchivo;

    @ManyToOne
    @JoinColumn(name = "actividad_id", nullable = false)
    private Actividad actividad;
}