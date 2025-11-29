package com.example.gamesearch.controller;

import com.example.gamesearch.entity.Game;
import com.example.gamesearch.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/games")
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    // --- 1. LEER TODOS (GET) ---
    @GetMapping
    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    // --- 2. LEER UNO POR ID (GET) ---
    // Necesario para cargar los datos en el formulario de edición
    @GetMapping("/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable Long id) {
        Optional<Game> game = gameRepository.findById(id);
        return game.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // --- 3. CREAR (POST) ---
    @PostMapping
    public ResponseEntity<Game> createGame(@RequestBody Game game) {
        // Lógica de imagen por defecto
        if (game.getImageUrl() == null || game.getImageUrl().trim().isEmpty()) {
            String imagenPorDefecto = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=500&q=80";
            game.setImageUrl(imagenPorDefecto);
        }
        Game nuevoJuego = gameRepository.save(game);
        return new ResponseEntity<>(nuevoJuego, HttpStatus.CREATED);
    }

    // --- 4. ACTUALIZAR (PUT) - ¡ESTO FALTABA! ---
    @PutMapping("/{id}")
    public ResponseEntity<Game> updateGame(@PathVariable Long id, @RequestBody Game gameDetails) {
        return gameRepository.findById(id)
                .map(game -> {
                    game.setName(gameDetails.getName());
                    game.setGenre(gameDetails.getGenre());
                    // Solo actualizamos la imagen si viene una nueva, si no, mantenemos la vieja
                    if (gameDetails.getImageUrl() != null && !gameDetails.getImageUrl().isEmpty()) {
                        game.setImageUrl(gameDetails.getImageUrl());
                    }
                    Game updatedGame = gameRepository.save(game);
                    return ResponseEntity.ok(updatedGame);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // --- 5. ELIMINAR (DELETE) - ¡ESTO FALTABA! ---
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGame(@PathVariable Long id) {
        if (gameRepository.existsById(id)) {
            gameRepository.deleteById(id);
            return ResponseEntity.ok().build(); // Devuelve 200 OK
        } else {
            return ResponseEntity.notFound().build(); // Devuelve 404 si no existe
        }
    }
}