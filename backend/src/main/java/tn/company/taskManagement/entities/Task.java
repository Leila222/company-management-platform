package tn.company.taskManagement.entities;

import jakarta.persistence.*;
import java.util.Date;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Task {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int idTask;

        private String title;
        private String description;

        @Temporal(TemporalType.TIMESTAMP)
        private Date dueDate;

        @Temporal(TemporalType.TIMESTAMP)
        private Date startDate;

        @Temporal(TemporalType.TIMESTAMP)
        private Date endDate;

        @Enumerated(EnumType.STRING)
        private Status status;

        @ManyToOne
        @JoinColumn(name = "project_id")
        private Project project;

        @ManyToOne
        @JoinColumn(name = "user_id")
        private Employee assignedEmp;
}
