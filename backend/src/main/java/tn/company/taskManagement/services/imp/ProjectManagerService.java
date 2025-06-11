package tn.company.taskManagement.services.imp;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.company.taskManagement.entities.Project;
import tn.company.taskManagement.entities.ProjectManager;
import tn.company.taskManagement.entities.Role;
import tn.company.taskManagement.repositories.ProjectManagerRepository;
import tn.company.taskManagement.repositories.ProjectRepository;
import tn.company.taskManagement.services.email.EmailService;
import tn.company.taskManagement.services.interfaces.ManagerServiceInterface;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectManagerService implements ManagerServiceInterface {

    @Autowired
    private ProjectManagerRepository managerRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public String addProjectManager(ProjectManager manager) {
        if (userService.isUsernameTaken(manager.getUsername())) {
            return "Username already in use.";
        }
        if (userService.isEmailTaken(manager.getEmail())) {
            return "Email already in use.";
        }

        String generatedPassword = userService.generateRandomPassword();
        String hashedPassword = passwordEncoder.encode(generatedPassword);
        manager.setPassword(hashedPassword);
        manager.setRole(Role.PROJECT_MANAGER);

        ProjectManager savedManager = managerRepository.save(manager);
        emailService.sendUserCredentials(savedManager, generatedPassword);
        return "Project Manager added successfully.";
    }

    @Override
    public String updateProjectManager(int id, ProjectManager updatedManager) {
        ProjectManager existingManager = managerRepository.findById(id)
                .orElse(null);

        if (existingManager == null) {
            return "Project Manager not found.";
        }

        if (!existingManager.getUsername().equals(updatedManager.getUsername()) &&
                userService.isUsernameTaken(updatedManager.getUsername())) {
            return "Username already in use.";
        }
        if (!existingManager.getEmail().equals(updatedManager.getEmail()) &&
                userService.isEmailTaken(updatedManager.getEmail())) {
            return "Email already in use.";
        }

        if (!existingManager.getPassword().equals(updatedManager.getPassword())) {
            String hashedPassword = passwordEncoder.encode(updatedManager.getPassword());
            existingManager.setPassword(hashedPassword);
        } else {
            existingManager.setPassword(updatedManager.getPassword());
        }

        existingManager.setUsername(updatedManager.getUsername());
        existingManager.setEmail(updatedManager.getEmail());
        existingManager.setFirstName(updatedManager.getFirstName());
        existingManager.setLastName(updatedManager.getLastName());
        existingManager.setRole(updatedManager.getRole());
        existingManager.setPhoneNumber(updatedManager.getPhoneNumber());

        managerRepository.save(existingManager);
        return "Project Manager updated successfully.";
    }

    @Override
    public void deleteProjectManager(int managerId) throws EntityNotFoundException {
        Optional<ProjectManager> managerOptional = managerRepository.findById(managerId);
        if (managerOptional.isEmpty()) {
            throw new EntityNotFoundException("Project Manager not found.");
        }

        List<Project> projectsManagedByManager = projectRepository.findByProjectManagerUserId(managerId);
        if (!projectsManagedByManager.isEmpty()) {
            throw new IllegalStateException("Cannot delete project manager. Projects are still managed by this manager.");
        }

        managerRepository.deleteById(managerId);
    }

    @Override
    public List<ProjectManager> getAllProjectManagers() {
        return managerRepository.findAll();
    }

    @Override
    public ProjectManager getProjectManagerById(int adminId) {
        Optional<ProjectManager> managerOptional = managerRepository.findById(adminId);
        return managerOptional.orElse(null);
    }
}
