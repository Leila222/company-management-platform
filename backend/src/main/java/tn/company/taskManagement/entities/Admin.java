package tn.company.taskManagement.entities;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@Entity
@DiscriminatorValue("Admin")
public class Admin extends User {
}
