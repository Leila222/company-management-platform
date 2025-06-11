package tn.company.taskManagement.services.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.company.taskManagement.entities.Project;
import tn.company.taskManagement.entities.Task;
import tn.company.taskManagement.repositories.ProjectRepository;
import tn.company.taskManagement.services.interfaces.ProjServiceInterface;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService implements ProjServiceInterface {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public Project addProject(Project project) {

        return projectRepository.save(project);
    }

    @Override
    public Project updateProject(int id, Project project) {
        Optional<Project> optionalProject = projectRepository.findById(id);
        if (optionalProject.isPresent()) {
            Project existingProject = optionalProject.get();

            existingProject.setName(project.getName());
            existingProject.setDescription(project.getDescription());
            existingProject.setStartDate(project.getStartDate());
            existingProject.setEndDate(project.getEndDate());
            existingProject.setProjectManager(project.getProjectManager());

            existingProject.getTasks().clear();
            if (project.getTasks() != null) {
                for (Task task : project.getTasks()) {
                    task.setProject(existingProject);
                    existingProject.getTasks().add(task);
                }
            }

            return projectRepository.save(existingProject);
        } else {
            return null;
        }
    }

    @Override
    public void deleteProject(int projectId) {

        projectRepository.deleteById(projectId);
    }

    @Override
    public List<Project> getAllProjects() {

        return projectRepository.findAll();
    }

    @Override
    public Project getProjectById(int projectId) {
        Optional<Project> project = projectRepository.findById(projectId);
        return project.orElse(null);
    }

    @Override
    public List<Project> getProjectsByManager(int projectManagerId) {
        return projectRepository.findByProjectManagerUserId(projectManagerId);
    }
}
