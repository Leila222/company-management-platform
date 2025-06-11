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
@DiscriminatorValue("ProjectManager")
public class ProjectManager extends User {

    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Complaint> receivedComplaints;

    @OneToMany(mappedBy = "projectManager")
    @JsonIgnore
    private List<Project> managedProjects;
}
