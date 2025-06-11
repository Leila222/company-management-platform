package tn.company.taskManagement.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idComplaint;
    private String title;
    private String description;

    @Temporal(TemporalType.DATE)
    private Date issueDate;

    private boolean status;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee sender;

    @ManyToOne
    @JoinColumn(name = "project_manager_id")
    private ProjectManager receiver;
}
