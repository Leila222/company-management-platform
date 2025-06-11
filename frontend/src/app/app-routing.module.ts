import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './backEnd/pages/dashboard/dashboard.component';
import {AllusersComponent} from "./backEnd/pages/users/allusers/allusers.component";
import {LoginComponent} from "./backEnd/pages/authenticate/login/login.component";
import {ProfileComponent} from "./backEnd/pages/LoggedInUser/profile/profile.component";
import {UpdateProfileComponent} from "./backEnd/pages/LoggedInUser/update-profile/update-profile.component";
import {UpdatePasswordComponent} from "./backEnd/pages/LoggedInUser/update-password/update-password.component";
import {UpdateUserComponent} from "./backEnd/pages/users/update-user/update-user.component";
import {UpdateEmployeeComponent} from "./backEnd/pages/users/update-employee/update-employee.component";
import {AddEmployeeComponent} from "./backEnd/pages/users/add-employee/add-employee.component";
import {AddManagerComponent} from "./backEnd/pages/users/add-manager/add-manager.component";
import {AddAdminComponent} from "./backEnd/pages/users/add-admin/add-admin.component";
import {ResetPasswordComponent} from "./backEnd/pages/authenticate/reset-password/reset-password.component";
import {ResetPasswordConfirmComponent} from "./backEnd/pages/authenticate/reset-password-confirm/reset-password-confirm.component";
import {AllProjectsComponent} from "./backEnd/pages/project/all-projects/all-projects.component";
import {UpdateProjectComponent} from "./backEnd/pages/project/update-project/update-project.component";
import {AddProjectComponent} from "./backEnd/pages/project/add-project/add-project.component";
import {AllTasksComponent} from "./backEnd/pages/tasks/all-tasks/all-tasks.component";
import {AddTaskComponent} from "./backEnd/pages/tasks/add-task/add-task.component";
import {UpdateTaskComponent} from "./backEnd/pages/tasks/update-task/update-task.component";
import {ProjectTasksComponent} from "./backEnd/pages/project/project-tasks/project-tasks.component";
import {AllComplaintsComponent} from "./backEnd/pages/complaints/all-complaints/all-complaints.component";
import {CalendarTasksComponent} from "./backEnd/pages/calendar/calendar-tasks/calendar-tasks.component";
import {ConsultProjectsComponent} from "./frontManager/pages/project/consult-projects/consult-projects.component";
import {DashboardManagerComponent} from "./frontManager/pages/dashboard-manager/dashboard-manager.component";
import {AdminGuard} from "./guards/admin.guard";
import {ManagerGuard} from "./guards/manager.guard";
import {UpdateprojectComponent} from "./frontManager/pages/project/updateproject/updateproject.component";
import {TasksProjectComponent} from "./frontManager/pages/project/tasks-project/tasks-project.component";
import {AllTasksMComponent} from "./frontManager/pages/task/all-tasks-m/all-tasks-m.component";
import {UpdateTaskMComponent} from "./frontManager/pages/task/update-task-m/update-task-m.component";
import {AddTaskMComponent} from "./frontManager/pages/task/add-task-m/add-task-m.component";
import {CalendarManagerComponent} from "./frontManager/pages/calendar/calendar-manager/calendar-manager.component";
import {ComplaintsComponent} from "./frontManager/pages/complaint/complaints/complaints.component";
import {ProfileMComponent} from "./frontManager/pages/loggedInManager/profile-m/profile-m.component";
import {
  UpdatePasswordMComponent
} from "./frontManager/pages/loggedInManager/update-password-m/update-password-m.component";
import {
  UpdateProfileMComponent
} from "./frontManager/pages/loggedInManager/update-profile-m/update-profile-m.component";
import {DashboardEmpComponent} from "./frontEmployee/pages/dashboard-emp/dashboard-emp.component";
import {EmployeeGuard} from "./guards/employee.guard";
import {ProfileEmpComponent} from "./frontEmployee/pages/loggedInEmployee/profile-emp/profile-emp.component";
import {
  UpdatePasswordEmpComponent
} from "./frontEmployee/pages/loggedInEmployee/update-password-emp/update-password-emp.component";
import {
  UpdateProfileEmpComponent
} from "./frontEmployee/pages/loggedInEmployee/update-profile-emp/update-profile-emp.component";
import {ViewTasksComponent} from "./frontEmployee/pages/task/view-tasks/view-tasks.component";
import {AddComplaintComponent} from "./frontEmployee/pages/complaint/add-complaint/add-complaint.component";
import {MyComplaintsComponent} from "./frontEmployee/pages/complaint/my-complaints/my-complaints.component";
import {ViewProjectsComponent} from "./frontEmployee/pages/view-projects/view-projects.component";
import {TasksPerProjectComponent} from "./frontEmployee/pages/task/tasks-per-project/tasks-per-project.component";
import {CalendarEmpComponent} from "./frontEmployee/pages/calendar/calendar-emp/calendar-emp.component";

const routes: Routes = [
  //admin
  {path:"dashboard",component:DashboardComponent, canActivate: [AdminGuard]},
  {path:"users", component: AllusersComponent, canActivate: [AdminGuard]},
  {path:"login", component: LoginComponent},
  {path:"reset-pwd", component: ResetPasswordComponent},
  {path:"reset-confirm", component: ResetPasswordConfirmComponent},
  {path:"profile", component: ProfileComponent, canActivate: [AdminGuard]},
  {path:"update-pwd", component: UpdatePasswordComponent, canActivate: [AdminGuard]},
  {path:"update-user/:id", component: UpdateUserComponent, canActivate: [AdminGuard]},
  {path:"update-employee/:id", component: UpdateEmployeeComponent, canActivate: [AdminGuard]},
  {path:"update-profile", component: UpdateProfileComponent, canActivate:[AdminGuard]},
  {path:"addEmployee", component: AddEmployeeComponent, canActivate:[AdminGuard]},
  {path:"addManager", component: AddManagerComponent, canActivate:[AdminGuard]},
  {path:"addAdmin", component: AddAdminComponent, canActivate:[AdminGuard]},
  {path:"projects", component: AllProjectsComponent, canActivate: [AdminGuard]},
  {path:"update-project/:id", component: UpdateProjectComponent, canActivate: [AdminGuard]},
  {path:"add-project", component: AddProjectComponent, canActivate:[AdminGuard]},
  {path:"tasks", component: AllTasksComponent, canActivate: [AdminGuard]},
  {path:"update-task/:id", component: UpdateTaskComponent, canActivate: [AdminGuard]},
  {path:"add-task", component: AddTaskComponent, canActivate:[AdminGuard]},
  {path:"projectTasks/:id", component: ProjectTasksComponent, canActivate:[AdminGuard]},
  {path:"complaints", component: AllComplaintsComponent, canActivate: [AdminGuard]},
  {path:"calendarTasks", component: CalendarTasksComponent, canActivate: [AdminGuard]},

  //manager
  {path:"projectsManager", component: ConsultProjectsComponent, canActivate: [ManagerGuard]},
  {path:"dashboardManager",component:DashboardManagerComponent, canActivate: [ManagerGuard]},
  {path:"updateProject/:id", component: UpdateprojectComponent, canActivate: [ManagerGuard]},
  {path:"TasksProject/:id", component: TasksProjectComponent, canActivate:[ManagerGuard]},
  {path:"allTasks", component: AllTasksMComponent, canActivate: [ManagerGuard]},
  {path:"updateTask/:id", component: UpdateTaskMComponent, canActivate: [ManagerGuard]},
  {path:"addTask", component: AddTaskMComponent, canActivate:[ManagerGuard]},
  {path:"calendarManager", component: CalendarManagerComponent, canActivate: [ManagerGuard]},
  {path:"allComplaints", component: ComplaintsComponent, canActivate: [ManagerGuard]},
  {path:"Profile", component: ProfileMComponent, canActivate: [ManagerGuard]},
  {path:"updatePwd", component: UpdatePasswordMComponent, canActivate: [ManagerGuard]},
  {path:"updateProfile", component: UpdateProfileMComponent, canActivate:[ManagerGuard]},

  //employee
  {path:"dashboardEmp",component:DashboardEmpComponent, canActivate: [EmployeeGuard]},
  {path:"ProfileEmp", component: ProfileEmpComponent, canActivate: [EmployeeGuard]},
  {path:"updatePWD", component: UpdatePasswordEmpComponent, canActivate: [EmployeeGuard]},
  {path:"UpdateProfile", component: UpdateProfileEmpComponent, canActivate:[EmployeeGuard]},
  {path:"viewTasks", component: ViewTasksComponent, canActivate: [EmployeeGuard]},
  {path:"viewProjects", component: ViewProjectsComponent, canActivate: [EmployeeGuard]},
  {path:"ProjectTasks/:id", component: TasksPerProjectComponent, canActivate:[EmployeeGuard]},
  {path:"addComplaint", component: AddComplaintComponent, canActivate: [EmployeeGuard]},
  {path:"myComplaints", component: MyComplaintsComponent, canActivate: [EmployeeGuard]},
  {path:"calendarEmp", component: CalendarEmpComponent, canActivate: [EmployeeGuard]},


  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect to dashboard on default path
  { path: '**', redirectTo: '/dashboard' } // Redirect any unknown paths to dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
