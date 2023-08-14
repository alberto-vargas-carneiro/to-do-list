package com.example.crud.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping
    public void createTask(@RequestBody ToDoRequestDTO data) {
        ToDo todo = new ToDo(data);
        Date currentDate = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        String strDate = formatter.format(currentDate);
        todo.setCreatedat(strDate);
        toDoRepository.save(todo);
        return;
    }

    @GetMapping
    public List<ToDo> getAllTasks() {
        List<ToDo> lista = toDoRepository.findAll();
        return lista;
    }
}
