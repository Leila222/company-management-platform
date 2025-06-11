import { User } from './User';
import { Complaint } from './Complaint';
import { Project } from './Project';

export class ProjectManager extends User {
  receivedComplaints: Complaint[] = [];
  managedProjects: Project[] = [];
}
