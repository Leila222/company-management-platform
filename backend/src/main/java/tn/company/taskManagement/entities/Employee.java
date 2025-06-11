package tn.company.taskManagement.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DiscriminatorValue("Employee")
public class Employee extends User {
    private boolean availability;
    private int experienceYears;

    @Enumerated(EnumType.STRING)
    private Position position;

    @OneToMany(mappedBy = "assignedEmp")
    @JsonIgnore
    private List<Task> tasks;

    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Complaint> madeComplaints;
}
