package com.example.gamesearch.controller;

import com.example.gamesearch.entity.Game;
import com.example.gamesearch.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    @GetMapping
    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    @GetMapping("/search")
    public List<Game> searchGames(@RequestParam("name") String name) {
        return gameRepository.findByNameContainingIgnoreCase(name);
    }

    @PostMapping
    public Game createGame(@RequestBody Game game) {
        return gameRepository.save(game);
    }
}