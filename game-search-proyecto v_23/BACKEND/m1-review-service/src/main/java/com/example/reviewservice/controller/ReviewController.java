package com.example.reviewservice.controller;

import com.example.reviewservice.entity.Review;
import com.example.reviewservice.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews") // Todas las URLs de este controlador empezarán con /api/reviews
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    // Endpoint para crear una nueva reseña
    // Se llamará con un POST a http://localhost:8082/api/reviews
    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        // Aquí podrías añadir lógica para validar que el juego y el usuario existen
        // llamando a los otros microservicios a través de Feign Client.
        Review savedReview = reviewRepository.save(review);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }

    // Endpoint para obtener todas las reseñas de un juego específico
    // Se llamará con un GET a, por ejemplo,
    // http://localhost:8082/api/reviews/game/101
    @GetMapping("/game/{gameId}")
    public ResponseEntity<List<Review>> getReviewsByGameId(@PathVariable Long gameId) {
        List<Review> reviews = reviewRepository.findByGameId(gameId);
        return ResponseEntity.ok(reviews);
    }
}