package tn.company.taskManagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.company.taskManagement.entities.Employee;
import tn.company.taskManagement.entities.Task;

import java.util.Date;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findByProjectIdProject(int projectId);
    List<Task> findByAssignedEmpUserId(int assignedEmpId);
    List<Task> findByAssignedEmp(Employee assignedEmp);

    @Query("SELECT t FROM Task t " +
            "WHERE t.assignedEmp.userId = :userId " +
            "AND t.status != 'COMPLETED'" +
            "AND ((" +
            "(t.startDate <= :dueDate AND t.dueDate >= :startDate AND t.startDate <= :startDate AND t.dueDate >= :dueDate)" +
            "))")
    List<Task> findOverlappingTasks(@Param("userId") int userId, @Param("startDate") Date startDate, @Param("dueDate") Date dueDate);


    @Query("SELECT t FROM Task t " +
            "WHERE t.assignedEmp.userId = :userId " +
            "AND t.status != 'COMPLETED'" +
            "AND t.idTask <> :taskId " +
            "AND ((" +
            "(t.startDate <= :dueDate AND t.dueDate >= :startDate AND t.startDate <= :startDate AND t.dueDate >= :dueDate)" +
            "))")
    List<Task> findOverlappingTasksExceptOne(@Param("userId") int userId, @Param("startDate") Date startDate, @Param("dueDate") Date dueDate, @Param("taskId") int taskId);

}
