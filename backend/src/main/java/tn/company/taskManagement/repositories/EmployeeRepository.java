package tn.company.taskManagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.company.taskManagement.entities.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}
