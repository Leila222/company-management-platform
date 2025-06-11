package tn.company.taskManagement.services.interfaces;

import tn.company.taskManagement.entities.Complaint;

import java.util.List;

public interface ComplaintServiceInterface {
    Complaint addComplaint(Complaint complaint);
    Complaint updateComplaint(int id, Complaint complaint);
    void deleteComplaint(int complaintId);
    List<Complaint> getAllComplaints();
    Complaint getComplaintById(int complaintId);

    List<Complaint> getComplaintsBySender(int senderId);
    List<Complaint> getComplaintsByReceiver(int receiverId);
}
