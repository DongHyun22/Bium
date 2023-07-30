package com.ssafy.bium.gameroom.repository;

import com.ssafy.bium.gameroom.GameRoom;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface GameRoomRepository extends CrudRepository<GameRoom, Long> {
    List<GameRoom> findAll();
}
