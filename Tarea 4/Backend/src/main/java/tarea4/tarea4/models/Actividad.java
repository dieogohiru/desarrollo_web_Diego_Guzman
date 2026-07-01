package tarea4.tarea4.models;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "actividad")
@JsonIgnoreProperties({"comentarios", "notas", "fotos"}) 
public class Actividad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "miembro_id", nullable = false)
    @JsonIgnoreProperties("actividades")
    private Miembro miembro;

    @Column(nullable = false)
    private String dia;

    @Column(name = "hora_inicio", length = 5, nullable = false)
    private String horaInicio;

    @Column(nullable = false)
    private String tipo;

    @Column(length = 45, nullable = false)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL)
    private List<Nota> notas = new java.util.ArrayList<>();

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public Miembro getMiembro() { return miembro; }
    public void setMiembro(Miembro miembro) { this.miembro = miembro; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    
    public String getDia() { return dia; }
    public void setDia(String dia) { this.dia = dia; }
    
    public String getHoraInicio() { return horaInicio; }
    public void setHoraInicio(String horaInicio) { this.horaInicio = horaInicio; }
    
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    
    public List<Nota> getNotas() { return notas; }
    public void setNotas(List<Nota> notas) { this.notas = notas; }
}