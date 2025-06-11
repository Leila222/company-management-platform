package tn.company.taskManagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.company.taskManagement.entities.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {
}