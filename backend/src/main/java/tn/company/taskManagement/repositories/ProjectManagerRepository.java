package tn.company.taskManagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.company.taskManagement.entities.ProjectManager;

@Repository
public interface ProjectManagerRepository extends JpaRepository<ProjectManager, Integer> {
}
