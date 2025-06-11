import { User } from './User';
import { Position } from './Position';
import { Task } from './Task';
import { Complaint } from './Complaint';

export class Employee extends User {
  availability: boolean = true;
  experienceYears: number =0;
  position: Position = Position.DEVELOPER;
  tasks: Task[] = [];
  madeComplaints: Complaint[] = [];
}