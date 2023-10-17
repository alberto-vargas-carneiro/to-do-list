package com.example.crud.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.crud.toDo.ToDo;
import com.example.crud.toDo.ToDoRepository;
import com.example.crud.toDo.ToDoRequestDTO;

@RestController
@RequestMapping("todo")
public class ToDoController {

    @Autowired
    private ToDoRepository toDoRepository;

    // @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/create")
    public void createTask(@RequestBody ToDoRequestDTO data) {
        ToDo todo = new ToDo(data);
        Date currentDate = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM HH:mm");
        String strDate = formatter.format(currentDate);
        todo.setCreatedat(strDate);
        toDoRepository.save(todo);
        return;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<ToDo> getAllTasks() {
        List<ToDo> lista = toDoRepository.findAll();
        return lista;
    }
}
