package tn.company.taskManagement.services.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.archimed.taskManagement.entities.*;
import tn.company.taskManagement.entities.Position;
import tn.company.taskManagement.entities.Role;
import tn.company.taskManagement.repositories.EmployeeRepository;
import tn.company.taskManagement.repositories.TaskRepository;
import tn.company.taskManagement.services.email.EmailService;
import tn.company.taskManagement.services.interfaces.EmpServiceInterface;
import tn.company.taskManagement.entities.Employee;
import tn.company.taskManagement.entities.Task;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService implements EmpServiceInterface {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addEmployee(Employee employee) {
        if (userService.isUsernameTaken(employee.getUsername())) {
            return "Username already in use.";
        }
        if (userService.isEmailTaken(employee.getEmail())) {
            return "Email already in use.";
        }

        String generatedPassword = userService.generateRandomPassword();
        String hashedPassword = passwordEncoder.encode(generatedPassword);
        employee.setPassword(hashedPassword);
        employee.setRole(Role.EMPLOYEE);
        employee.setAvailability(true);
        employee.setPosition(Position.DESIGNER);

        Employee savedEmployee = employeeRepository.save(employee);
        emailService.sendUserCredentials(savedEmployee, generatedPassword);
        return "Employee added successfully.";
    }

    @Override
    public String updateEmployee(int id, Employee updatedEmployee) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElse(null);

        if (existingEmployee == null) {
            return "User not found.";
        }

        if (!existingEmployee.getUsername().equals(updatedEmployee.getUsername()) &&
                userService.isUsernameTaken(updatedEmployee.getUsername())) {
            return "Username already in use.";
        }
        if (!existingEmployee.getEmail().equals(updatedEmployee.getEmail()) &&
                userService.isEmailTaken(updatedEmployee.getEmail())) {
            return "Email already in use.";
        }

        if (!existingEmployee.getPassword().equals(updatedEmployee.getPassword())) {
            String hashedPassword = passwordEncoder.encode(updatedEmployee.getPassword());
            existingEmployee.setPassword(hashedPassword);
        } else {
            existingEmployee.setPassword(updatedEmployee.getPassword());
        }

        existingEmployee.setUsername(updatedEmployee.getUsername());
        existingEmployee.setEmail(updatedEmployee.getEmail());
        existingEmployee.setFirstName(updatedEmployee.getFirstName());
        existingEmployee.setLastName(updatedEmployee.getLastName());
        existingEmployee.setRole(updatedEmployee.getRole());
        existingEmployee.setPhoneNumber(updatedEmployee.getPhoneNumber());
        existingEmployee.setPosition(updatedEmployee.getPosition());
        existingEmployee.setAvailability(updatedEmployee.isAvailability());
        existingEmployee.setExperienceYears(updatedEmployee.getExperienceYears());
        employeeRepository.save(existingEmployee);
        return "Employee updated successfully.";
    }

    @Override
    public String deleteEmployee(int employeeId) {
            Employee employee = employeeRepository.findById(employeeId).orElse(null);
            if (employee == null) {
                return "Employee not found.";
            }

            List<Task> tasksAssignedToEmployee = taskRepository.findByAssignedEmp(employee);
            if (!tasksAssignedToEmployee.isEmpty()) {
                return "Cannot delete employee. Tasks are still assigned to this employee.";
            }

            employeeRepository.delete(employee);
            return "Employee deleted successfully.";
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee getEmployeeById(int employeeId) {
        Optional<Employee> employeeOptional = employeeRepository.findById(employeeId);
        return employeeOptional.orElse(null);
    }

}
