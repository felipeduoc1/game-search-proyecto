package com.example.reviewservice.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Cliente Feign para comunicarse con m3-game-service.
 * El valor de 'name' ("game-search") debe coincidir con el
 * 'spring.application.name'
 * del servicio de destino, tal como está registrado en Eureka.
 */
@FeignClient(name = "game-search")
public interface GameServiceClient {

    /**
     * Llama al endpoint /api/games/{id} en m3-game-service para obtener un juego
     * por su ID.
     */
    @GetMapping("/api/games/{id}")
    GameDTO findGameById(@PathVariable("id") Long id);
}
