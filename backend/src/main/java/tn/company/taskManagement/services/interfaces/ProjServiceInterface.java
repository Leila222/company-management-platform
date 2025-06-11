package tn.company.taskManagement.services.interfaces;

import tn.company.taskManagement.entities.Project;

import java.util.List;

public interface ProjServiceInterface {
    Project addProject(Project project);
    Project updateProject(int id, Project project);
    void deleteProject(int projectId);
    List<Project> getAllProjects();
    Project getProjectById(int projectId);

    List<Project> getProjectsByManager(int projectManagerId);

}
