package tarea4.tarea4.models;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "nota")
public class Nota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "nota", nullable = false)
    private Integer valor; 

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "actividad_id", referencedColumnName = "id", nullable = false)
    @JsonIgnore 
    private Actividad actividad;

    public Nota() {}

    public Nota(Integer valor, Actividad actividad) {
        this.valor = valor;
        this.actividad = actividad;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public Integer getValor() { return valor; }
    public void setValor(Integer valor) { this.valor = valor; }
    
    public Actividad getActividad() { return actividad; }
    public void setActividad(Actividad actividad) { this.actividad = actividad; }
}