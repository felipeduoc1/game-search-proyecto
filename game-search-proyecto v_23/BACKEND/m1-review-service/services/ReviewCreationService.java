package com.example.reviewservice.services;

import com.example.reviewservice.clients.GameDTO;
import com.example.reviewservice.clients.GameServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewCreationService {

    private final GameServiceClient gameServiceClient;

    @Autowired
    public ReviewCreationService(GameServiceClient gameServiceClient) {
        this.gameServiceClient = gameServiceClient;
    }

    public void createReviewForGame(Long gameId, String reviewContent) {
        // 1. Llama a m3-game-service usando el cliente Feign para obtener datos del
        // juego.
        try {
            GameDTO game = gameServiceClient.findGameById(gameId);

            System.out.println("Juego encontrado: " + game.getTitle() + ". Procediendo a crear la reseña.");

            // 2. Aquí iría tu lógica para guardar la nueva reseña en la base de datos,
            // asociándola con el gameId.
            // reviewRepository.save(new Review(..., gameId, ...));

        } catch (Exception e) {
            // Maneja el error, por ejemplo, si el juego no existe.
            System.err.println(
                    "Error: No se pudo crear la reseña porque el juego con ID " + gameId + " no fue encontrado.");
        }
    }
}
