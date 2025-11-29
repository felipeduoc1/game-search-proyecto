package com.example.reviewservice.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "REVIEWS")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long gameId;

    // ✅ Este es el campo clave para que se guarde el nombre
    private String username;

    // ✅ Usamos 'comment' porque así lo envía tu React
    @Column(name = "REVIEW_COMMENT", length = 1000)
    private String comment;

    private int rating;
    private LocalDateTime fecha;

    public Review() {
        this.fecha = LocalDateTime.now();
    }

    public Review(Long gameId, String username, String comment, int rating) {
        this.gameId = gameId;
        this.username = username;
        this.comment = comment;
        this.rating = rating;
        this.fecha = LocalDateTime.now();
    }

    // Getters y Setters (Vitales para que funcione)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getGameId() {
        return gameId;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }
}