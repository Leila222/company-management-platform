package tn.company.taskManagement.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.company.taskManagement.entities.Employee;
import tn.company.taskManagement.services.imp.EmployeeService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/add")
    public ResponseEntity<String> addEmployee(@RequestBody Employee employee) {
        String responseMessage = employeeService.addEmployee(employee);
        if (responseMessage.equals("Employee added successfully.")) {
            return new ResponseEntity<>(responseMessage, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(responseMessage, HttpStatus.BAD_REQUEST);
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Object> updateEmployee(@PathVariable int id, @RequestBody Employee updatedEmployee) {
        String responseMessage = employeeService.updateEmployee(id, updatedEmployee);
        if (responseMessage.equals("Employee updated successfully.")) {
            return ResponseEntity.ok(responseMessage);
        } else if (responseMessage.equals("Employee not found.")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMessage);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMessage);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable int id) {
        String responseMessage = employeeService.deleteEmployee(id);
        if (responseMessage.equals("Employee deleted successfully.")) {
            return new ResponseEntity<>(responseMessage, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(responseMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/all")
    public List<Employee> getAllEmployees() {

        return employeeService.getAllEmployees();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable int id) {
        Employee employee = employeeService.getEmployeeById(id);
        if (employee != null) {
            return ResponseEntity.ok(employee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
