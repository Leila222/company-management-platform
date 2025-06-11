import { Employee } from './Employee';
import { Status } from './Status';
import { Project } from './Project';

export class Task {
  idTask: number =0;
  title: string ='';
  description: string='';
  dueDate: Date = new Date();
  startDate: Date = new Date();
  endDate: Date= new Date();
  status: Status = Status.TO_DO;
  project: Project = new Project();
  assignedEmp: Employee = new Employee();
}
