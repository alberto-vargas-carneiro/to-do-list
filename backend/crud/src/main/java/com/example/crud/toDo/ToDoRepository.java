package com.example.crud.toDo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ToDoRepository extends JpaRepository<ToDo, Long> {

    List<ToDo> findByCreatedby(String email);
    void deleteById(Long id);
}
