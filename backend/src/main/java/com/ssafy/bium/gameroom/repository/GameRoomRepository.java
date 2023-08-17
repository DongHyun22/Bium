package com.ssafy.bium.gameroom.repository;

import com.ssafy.bium.gameroom.GameRoom;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface GameRoomRepository extends PagingAndSortingRepository<GameRoom, String> {
    List<GameRoom> findAll();

    Iterable<GameRoom> findAll(Sort sort);

    Optional<GameRoom> findByCustomSessionId(String gameRoomId);


}
