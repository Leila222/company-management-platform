package tn.company.taskManagement.services.interfaces;

import jakarta.persistence.EntityNotFoundException;
import tn.company.taskManagement.entities.Admin;

import java.util.List;

public interface AdminServiceInterface {
    String addAdmin(Admin admin);
    String updateAdmin(int id, Admin admin);
    void deleteAdmin(int adminId) throws EntityNotFoundException;
    List<Admin> getAllAdmins();
    Admin getAdminById(int adminId);
}
