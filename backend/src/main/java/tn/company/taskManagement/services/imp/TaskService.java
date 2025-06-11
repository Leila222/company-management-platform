package tn.company.taskManagement.services.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.company.taskManagement.entities.Employee;
import tn.company.taskManagement.entities.Project;
import tn.company.taskManagement.entities.Task;
import tn.company.taskManagement.repositories.EmployeeRepository;
import tn.company.taskManagement.repositories.ProjectRepository;
import tn.company.taskManagement.repositories.TaskRepository;
import tn.company.taskManagement.services.interfaces.TaskServiceInterface;
import tn.company.taskManagement.entities.Status;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService implements TaskServiceInterface {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public String addTask(Task task) {
            if (task.getProject() != null && task.getProject().getIdProject() != 0) {
                Optional<Project> project = projectRepository.findById(task.getProject().getIdProject());
                if (project.isPresent()) {
                    task.setProject(project.get());
                    if (!isDateBetween(task))
                    {
                        return "the task doesn't align with project duration.";
                    }
                } else {
                    return "Project not found.";
                }
            }

            if (task.getAssignedEmp() != null && task.getAssignedEmp().getUserId() != 0) {
                Optional<Employee> employee = employeeRepository.findById(task.getAssignedEmp().getUserId());
                if (employee.isPresent()) {
                    task.setAssignedEmp(employee.get());

                    List<Task> overlappingTasks = taskRepository.findOverlappingTasks(task.getAssignedEmp().getUserId(), task.getStartDate(), task.getDueDate());
                    if (!overlappingTasks.isEmpty()) {
                        return "Employee isn't available due to overlapping tasks.";
                    }
                } else {
                    return "Employee not found.";
                }
            }

            task.setEndDate(null);
            task.setStatus(Status.TO_DO);
            Calendar cal = Calendar.getInstance();
            cal.setTime(task.getStartDate());
            if (cal.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY) {
                return "Start date corresponds to a Sunday.";
            }
            taskRepository.save(task);
            return "Task added successfully.";
    }


    public boolean isDateBetween(Task task) {
        Project project = task.getProject();
        Date startDate = task.getStartDate();
        Date dueDate = task.getDueDate();
        return startDate.after(project.getStartDate()) && startDate.before(project.getEndDate())
                && dueDate.after(project.getStartDate()) && dueDate.before(project.getEndDate());
    }

    @Override
    public String updateTask(int id, Task task) {
        if (taskRepository.existsById(id)) {

            if (task.getProject() != null && task.getProject().getIdProject() != 0) {
                Optional<Project> project = projectRepository.findById(task.getProject().getIdProject());
                if (project.isPresent()) {
                    task.setProject(project.get());
                    if (!isDateBetween(task))
                    {
                        return "the task doesn't align with project duration.";
                    }
                } else {
                    return "Project not found.";
                }
            }

            if (task.getAssignedEmp() != null && task.getAssignedEmp().getUserId() != 0) {
                Optional<Employee> employee = employeeRepository.findById(task.getAssignedEmp().getUserId());
                employee.ifPresent(task::setAssignedEmp);

                List<Task> overlappingTasks = taskRepository.findOverlappingTasksExceptOne(task.getAssignedEmp().getUserId(), task.getStartDate(), task.getDueDate(), id);
                if (!overlappingTasks.isEmpty()) {
                    return "Employee isn't available due to overlapping tasks.";
                }
            }

            task.setIdTask(id);

            if (task.getStatus()==Status.COMPLETED){
                task.setEndDate(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
            }

            Calendar cal = Calendar.getInstance();
            cal.setTime(task.getStartDate());
            if (cal.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY) {
                return "Start date corresponds to a Sunday.";
            }

            taskRepository.save(task);
            return "Task updated successfully.";
        }
        return null;
    }

    @Override
    public void deleteTask(int taskId) {

        taskRepository.deleteById(taskId);
    }

    @Override
    public List<Task> getAllTasks() {

        return taskRepository.findAll();
    }

    @Override
    public Task getTaskById(int taskId) {
        Optional<Task> task = taskRepository.findById(taskId);
        return task.orElse(null);
    }

    @Override
    public List<Task> getTasksByProject(int projectId) {

        return taskRepository.findByProjectIdProject(projectId);
    }

    @Override
    public List<Task> getTasksByAssignedEmp(int assignedEmpId) {
        return taskRepository.findByAssignedEmpUserId(assignedEmpId);
    }

}
