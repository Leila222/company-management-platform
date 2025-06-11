package tn.company.taskManagement.services.interfaces;

import jakarta.persistence.EntityNotFoundException;
import tn.company.taskManagement.entities.ProjectManager;

import java.util.List;

public interface ManagerServiceInterface {
    String addProjectManager(ProjectManager projectManager);
    String updateProjectManager(int id, ProjectManager projectManager);
    void deleteProjectManager(int managerId) throws EntityNotFoundException;
    List<ProjectManager> getAllProjectManagers();
    ProjectManager getProjectManagerById(int ProjectManagerId);
}
