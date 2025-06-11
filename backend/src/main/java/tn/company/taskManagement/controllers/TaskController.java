package tn.company.taskManagement.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.company.taskManagement.entities.Task;
import tn.company.taskManagement.services.imp.TaskService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/add")
    public ResponseEntity<String> addTask(@RequestBody Task task) {
        String responseMessage = taskService.addTask(task);
        if (responseMessage.equals("Task added successfully.")) {
            return new ResponseEntity<>(responseMessage, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(responseMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateTask(@PathVariable int id, @RequestBody Task updatedTask) {

        String responseMessage = taskService.updateTask(id, updatedTask);
        if (responseMessage.equals("Task updated successfully.")){
            return new ResponseEntity<>(responseMessage, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(responseMessage, HttpStatus.BAD_REQUEST);
        }
    }


    @DeleteMapping("/delete/{id}")
    public void deleteTask(@PathVariable int id) {
        taskService.deleteTask(id);
    }

    @GetMapping("/all")
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/get/{id}")
    public Task getTaskById(@PathVariable int id) {
        return taskService.getTaskById(id);
    }

    @GetMapping("/project/{projectId}")
    public List<Task> getTasksByProjectId(@PathVariable int projectId) {
        return taskService.getTasksByProject(projectId);
    }

    @GetMapping("/employee/{assignedEmpId}")
    public List<Task> getTasksByAssignedEmpId(@PathVariable int assignedEmpId) {
        return taskService.getTasksByAssignedEmp(assignedEmpId);
    }

}