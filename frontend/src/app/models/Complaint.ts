import { Employee } from './Employee';
import { ProjectManager } from './ProjectManager';

export class Complaint {
  idComplaint: number =0;
  title: string = '';
  description: string = '';
  issueDate: Date = new Date();
  status: boolean = false;
  sender: Employee = new Employee();
  receiver: ProjectManager = new ProjectManager();
}
