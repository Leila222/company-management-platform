import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FullCalendarModule} from "@fullcalendar/angular";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './backEnd/pages/dashboard/dashboard.component';
import { SidebarComponent } from './backEnd/components/sidebar/sidebar.component';
import { HeaderComponent } from './backEnd/components/header/header.component';
import {AllusersComponent} from "./backEnd/pages/users/allusers/allusers.component";
import {LoginComponent} from "./backEnd/pages/authenticate/login/login.component";
import {ProfileComponent} from "./backEnd/pages/LoggedInUser/profile/profile.component";
import {UpdateProfileComponent} from "./backEnd/pages/LoggedInUser/update-profile/update-profile.component";
import {UpdatePasswordComponent} from "./backEnd/pages/LoggedInUser/update-password/update-password.component";
import {UpdateUserComponent} from "./backEnd/pages/users/update-user/update-user.component";
import {UpdateEmployeeComponent} from "./backEnd/pages/users/update-employee/update-employee.component";
import {AddAdminComponent} from "./backEnd/pages/users/add-admin/add-admin.component";
import {AddManagerComponent} from "./backEnd/pages/users/add-manager/add-manager.component";
import {AddEmployeeComponent} from "./backEnd/pages/users/add-employee/add-employee.component";
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
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from "@angular/material/paginator";
import { HeaderEmpComponent } from './frontEmployee/components/header-emp/header-emp.component';
import { SidebarEmpComponent } from './frontEmployee/components/sidebar-emp/sidebar-emp.component';
import {ConsultProjectsComponent} from "./frontManager/pages/project/consult-projects/consult-projects.component";
import { HeaderManagerComponent } from './frontManager/components/header-manager/header-manager.component';
import { SidebarManagerComponent } from './frontManager/components/sidebar-manager/sidebar-manager.component';
import { DashboardManagerComponent } from './frontManager/pages/dashboard-manager/dashboard-manager.component';
import {UpdateprojectComponent} from "./frontManager/pages/project/updateproject/updateproject.component";
import {TasksProjectComponent} from "./frontManager/pages/project/tasks-project/tasks-project.component";
import {AddTaskMComponent} from "./frontManager/pages/task/add-task-m/add-task-m.component";
import {UpdateTaskMComponent} from "./frontManager/pages/task/update-task-m/update-task-m.component";
import {AllTasksMComponent} from "./frontManager/pages/task/all-tasks-m/all-tasks-m.component";
import {CalendarManagerComponent} from "./frontManager/pages/calendar/calendar-manager/calendar-manager.component";
import {ComplaintsComponent} from "./frontManager/pages/complaint/complaints/complaints.component";
import {ProfileMComponent} from "./frontManager/pages/loggedInManager/profile-m/profile-m.component";
import {UpdateProfileMComponent} from "./frontManager/pages/loggedInManager/update-profile-m/update-profile-m.component";
import {UpdatePasswordMComponent} from "./frontManager/pages/loggedInManager/update-password-m/update-password-m.component";
import { DashboardEmpComponent } from './frontEmployee/pages/dashboard-emp/dashboard-emp.component';
import {UpdateProfileEmpComponent} from "./frontEmployee/pages/loggedInEmployee/update-profile-emp/update-profile-emp.component";
import {UpdatePasswordEmpComponent} from "./frontEmployee/pages/loggedInEmployee/update-password-emp/update-password-emp.component";
import {ProfileEmpComponent} from "./frontEmployee/pages/loggedInEmployee/profile-emp/profile-emp.component";
import {ViewTasksComponent} from "./frontEmployee/pages/task/view-tasks/view-tasks.component";
import {AddComplaintComponent} from "./frontEmployee/pages/complaint/add-complaint/add-complaint.component";
import {MyComplaintsComponent} from "./frontEmployee/pages/complaint/my-complaints/my-complaints.component";
import {ViewProjectsComponent} from "./frontEmployee/pages/view-projects/view-projects.component";
import {TasksPerProjectComponent} from "./frontEmployee/pages/task/tasks-per-project/tasks-per-project.component";
import {CalendarEmpComponent} from "./frontEmployee/pages/calendar/calendar-emp/calendar-emp.component";


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    AllusersComponent,
    LoginComponent,
    ProfileComponent,
    UpdateProfileComponent,
    UpdatePasswordComponent,
    UpdateUserComponent,
    UpdateEmployeeComponent,
    AddAdminComponent,
    AddManagerComponent,
    AddEmployeeComponent,
    ResetPasswordComponent,
    ResetPasswordConfirmComponent,
    AllProjectsComponent,
    UpdateProjectComponent,
    AddProjectComponent,
    AllTasksComponent,
    AddTaskComponent,
    UpdateTaskComponent,
    ProjectTasksComponent,
    AllComplaintsComponent,
    CalendarTasksComponent,
    HeaderEmpComponent,
    SidebarEmpComponent,
    ConsultProjectsComponent,
    HeaderManagerComponent,
    SidebarManagerComponent,
    DashboardManagerComponent,
    UpdateprojectComponent,
    TasksProjectComponent,
    AddTaskMComponent,
    UpdateTaskMComponent,
    AllTasksMComponent,
    CalendarManagerComponent,
    ComplaintsComponent,
    ProfileMComponent,
    UpdateProfileMComponent,
    UpdatePasswordMComponent,
    DashboardEmpComponent,
    UpdateProfileEmpComponent,
    UpdatePasswordEmpComponent,
    ProfileEmpComponent,
    ViewTasksComponent,
    AddComplaintComponent,
    MyComplaintsComponent,
    ViewProjectsComponent,
    TasksPerProjectComponent,
    CalendarEmpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    NoopAnimationsModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
