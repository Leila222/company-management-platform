package tn.company.taskManagement.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.company.taskManagement.entities.Project;
import tn.company.taskManagement.entities.ProjectManager;
import tn.company.taskManagement.repositories.ProjectManagerRepository;
import tn.company.taskManagement.services.interfaces.ProjServiceInterface;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    private ProjServiceInterface projServiceInterface;

    @Autowired
    private ProjectManagerRepository projectManagerRepository;

    @PostMapping("/add")
    public Project addProject(@RequestBody Project project) {
        if (project.getProjectManager() != null && project.getProjectManager().getUserId() != 0) {
            Optional<ProjectManager> projectManager = projectManagerRepository.findById(project.getProjectManager().getUserId());
            projectManager.ifPresent(project::setProjectManager);
        }
        return projServiceInterface.addProject(project);
    }

    @PutMapping("/update/{id}")
    public Project updateProject(@PathVariable int id, @RequestBody Project updatedProject) {
        if (updatedProject.getProjectManager() != null && updatedProject.getProjectManager().getUserId() != 0) {
            Optional<ProjectManager> projectManager = projectManagerRepository.findById(updatedProject.getProjectManager().getUserId());
            projectManager.ifPresent(updatedProject::setProjectManager);
        }
        return projServiceInterface.updateProject(id, updatedProject);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProject(@PathVariable int id) {
        projServiceInterface.deleteProject(id);
    }

    @GetMapping("/all")
    public List<Project> getAllProjects() {
        return projServiceInterface.getAllProjects();
    }

    @GetMapping("/get/{id}")
    public Project getProjectById(@PathVariable int id) {
        return projServiceInterface.getProjectById(id);
    }

    @GetMapping("/manager/{managerId}")
    public List<Project> getProjectsByProjectManagerId(@PathVariable int managerId) {
        return projServiceInterface.getProjectsByManager(managerId);
    }
}