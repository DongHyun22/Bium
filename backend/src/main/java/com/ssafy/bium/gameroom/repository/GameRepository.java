package com.ssafy.bium.gameroom.repository;

import com.ssafy.bium.gameroom.Game;
import org.springframework.data.repository.CrudRepository;

public interface GameRepository extends CrudRepository<Game, String> {
}
