package tn.company.taskManagement.services.interfaces;

import tn.company.taskManagement.entities.Employee;

import java.util.List;

public interface EmpServiceInterface {
    String addEmployee(Employee employee);
    String updateEmployee(int id, Employee employee);
    String deleteEmployee(int employeeId);
    List<Employee> getAllEmployees();
    Employee getEmployeeById(int employeeId);
}