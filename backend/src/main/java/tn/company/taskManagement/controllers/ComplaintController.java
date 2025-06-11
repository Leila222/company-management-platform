package tn.company.taskManagement.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.company.taskManagement.entities.Complaint;
import tn.company.taskManagement.services.interfaces.ComplaintServiceInterface;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/complaint")
public class ComplaintController {

    @Autowired
    private ComplaintServiceInterface complaintService;

    @PostMapping("/add")
    public Complaint addComplaint(@RequestBody Complaint complaint) {

        return complaintService.addComplaint(complaint);
    }

    @PutMapping("/update/{id}")
    public Complaint updateComplaint(@PathVariable int id, @RequestBody Complaint updatedComplaint) {
        return complaintService.updateComplaint(id, updatedComplaint);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteComplaint(@PathVariable int id) {

        complaintService.deleteComplaint(id);
    }

    @GetMapping("/all")
    public List<Complaint> getAllComplaints() {

        return complaintService.getAllComplaints();
    }

    @GetMapping("/get/{id}")
    public Complaint getComplaintById(@PathVariable int id) {

        return complaintService.getComplaintById(id);
    }

    @GetMapping("/sender/{senderId}")
    public List<Complaint> getComplaintsBySenderId(@PathVariable int senderId) {
        return complaintService.getComplaintsBySender(senderId);
    }

    @GetMapping("/receiver/{receiverId}")
    public List<Complaint> getComplaintsByReceiverId(@PathVariable int receiverId) {
        return complaintService.getComplaintsByReceiver(receiverId);
    }
}