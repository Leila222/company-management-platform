package tn.company.taskManagement.controllers;


import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.company.taskManagement.entities.ProjectManager;
import tn.company.taskManagement.services.imp.ProjectManagerService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/manager")
public class ManagerController {

    @Autowired
    private ProjectManagerService managerService;

    @PostMapping("/add")
    public ResponseEntity<String> addProjectManager(@RequestBody ProjectManager manager) {
        String responseMessage = managerService.addProjectManager(manager);
        if (responseMessage.equals("Project Manager added successfully.")) {
            return new ResponseEntity<>(responseMessage, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(responseMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateProjectManager(@PathVariable int id, @RequestBody ProjectManager updatedManager) {
        String responseMessage = managerService.updateProjectManager(id, updatedManager);
        if (responseMessage.equals("Project Manager updated successfully.")) {
            return new ResponseEntity<>(responseMessage, HttpStatus.OK);
        } else if (responseMessage.equals("Project Manager not found.")) {
            return new ResponseEntity<>(responseMessage, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(responseMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProjectManager(@PathVariable int id) {
        try {
            managerService.deleteProjectManager(id);
            return new ResponseEntity<>("Project Manager deleted successfully.", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/all")
    public List<ProjectManager> getAllProjectManagers() {
        return managerService.getAllProjectManagers();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getProjectManagerById(@PathVariable int id) {
        ProjectManager manager = managerService.getProjectManagerById(id);
        if (manager != null) {
            return ResponseEntity.ok(manager);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
