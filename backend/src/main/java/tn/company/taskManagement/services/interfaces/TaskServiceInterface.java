package tn.company.taskManagement.services.interfaces;

import tn.company.taskManagement.entities.Task;

import java.util.List;

public interface TaskServiceInterface {
    String addTask(Task task);
    String updateTask(int id, Task task);
    void deleteTask(int taskId);
    List<Task> getAllTasks();
    Task getTaskById(int taskId);

    List<Task> getTasksByProject(int projectId);
    List<Task> getTasksByAssignedEmp(int assignedEmpId);

}
