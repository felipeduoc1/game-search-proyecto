package com.example.reviewservice.clients;

import java.time.LocalDate;

/**
 * Data Transfer Object para representar la información de un juego
 * que se recibe desde m3-game-service.
 * Los campos deben coincidir con los del DTO en el servicio de juegos.
 */
public class GameDTO {
    private Long id;
    private String title;
    private String genre;
    private String platform;
    private LocalDate releaseDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }
}