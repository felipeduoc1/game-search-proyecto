// Ubicación correcta: .../src/main/java/com/example/reviewservice/controllers/ReviewController.java
package com.example.reviewservice.controllers;

import com.example.reviewservice.services.ReviewCreationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewCreationService reviewCreationService;

    // Inyección por constructor (práctica recomendada)
    @Autowired
    public ReviewController(ReviewCreationService reviewCreationService) {
        this.reviewCreationService = reviewCreationService;
    }

    @PostMapping
    public ResponseEntity<String> createReview(@RequestBody ReviewRequest request) {
        // Llama al servicio que se comunica con el otro microservicio
        reviewCreationService.createReviewForGame(request.getGameId(), request.getContent());
        return ResponseEntity.ok("Solicitud de creación de reseña recibida para el juego ID: " + request.getGameId());
    }

    // DTO para la petición (práctica recomendada)
    public static class ReviewRequest {
        private Long gameId;
        private String content;

        public Long getGameId() {
            return gameId;
        }

        public void setGameId(Long gameId) {
            this.gameId = gameId;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }
    }
}
