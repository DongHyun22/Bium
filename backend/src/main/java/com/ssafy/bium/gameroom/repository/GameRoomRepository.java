package com.ssafy.bium.gameroom.repository;

import com.ssafy.bium.gameroom.GameRoom;
import com.ssafy.bium.gameroom.request.GameRoomDto;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface GameRoomRepository extends PagingAndSortingRepository<GameRoom, Long> {
    List<GameRoom> findAll();
    GameRoom findGameRoomByGameRoomId(String gameRoomId);
}
