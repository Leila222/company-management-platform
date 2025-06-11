package tn.company.taskManagement.services.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.company.taskManagement.entities.Complaint;
import tn.company.taskManagement.entities.Employee;
import tn.company.taskManagement.entities.ProjectManager;
import tn.company.taskManagement.repositories.ComplaintRepository;
import tn.company.taskManagement.repositories.EmployeeRepository;
import tn.company.taskManagement.repositories.ProjectManagerRepository;
import tn.company.taskManagement.services.interfaces.ComplaintServiceInterface;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ComplaintService implements ComplaintServiceInterface {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ProjectManagerRepository projectManagerRepository;
    @Override
    public Complaint addComplaint(Complaint complaint) {

        if (complaint.getSender() != null && complaint.getSender().getUserId() != 0) {
            Optional<Employee> sender = employeeRepository.findById(complaint.getSender().getUserId());
            sender.ifPresent(complaint::setSender);
        }

        if (complaint.getReceiver() != null && complaint.getReceiver().getUserId() != 0) {
            Optional<ProjectManager> receiver = projectManagerRepository.findById(complaint.getReceiver().getUserId());
            receiver.ifPresent(complaint::setReceiver);
        }

        complaint.setIssueDate(new Date());
        complaint.setStatus(false);

        return complaintRepository.save(complaint);
    }

    @Override
    public Complaint updateComplaint(int id, Complaint updatedComplaint) {
        Optional<Complaint> optionalComplaint = complaintRepository.findById(id);
        if (optionalComplaint.isPresent()) {
            Complaint existingComplaint = optionalComplaint.get();

            existingComplaint.setTitle(updatedComplaint.getTitle());
            existingComplaint.setDescription(updatedComplaint.getDescription());
            existingComplaint.setStatus(updatedComplaint.isStatus());

            if (updatedComplaint.getSender() != null && updatedComplaint.getSender().getUserId() != 0) {
                Optional<Employee> sender = employeeRepository.findById(updatedComplaint.getSender().getUserId());
                sender.ifPresent(existingComplaint::setSender);
            }

            if (updatedComplaint.getReceiver() != null && updatedComplaint.getReceiver().getUserId() != 0) {
                Optional<ProjectManager> receiver = projectManagerRepository.findById(updatedComplaint.getReceiver().getUserId());
                receiver.ifPresent(existingComplaint::setReceiver);
            }

            return complaintRepository.save(existingComplaint);
        }
        return null;
    }

    @Override
    public void deleteComplaint(int complaintId) {
        complaintRepository.deleteById(complaintId);
    }

    @Override
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @Override
    public Complaint getComplaintById(int complaintId) {
        Optional<Complaint> optionalComplaint = complaintRepository.findById(complaintId);
        return optionalComplaint.orElse(null); // Return null if not found
    }

    @Override
    public List<Complaint> getComplaintsBySender(int senderId) {
        return complaintRepository.findBySenderUserId(senderId);
    }

    @Override
    public List<Complaint> getComplaintsByReceiver(int receiverId) {
        return complaintRepository.findByReceiverUserId(receiverId);
    }
}
