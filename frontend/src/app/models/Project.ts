import { Task } from './Task';
import { ProjectManager } from './ProjectManager';

export class Project {
  idProject: number =0;
  name: string = '';
  description: string ='';
  startDate: Date = new Date();
  endDate: Date = new Date();
  tasks: Task[] = [];
  projectManager: ProjectManager = new ProjectManager();
}
