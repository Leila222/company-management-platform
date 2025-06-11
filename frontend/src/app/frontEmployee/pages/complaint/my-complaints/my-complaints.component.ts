import { Component, OnInit } from '@angular/core';
import {Complaint} from "../../../../models/Complaint";
import {ComplaintService} from "../../../../services/complaint/complaint.service";
import {AuthService} from "../../../../services/authenticate/auth.service";

declare var Swal:any
@Component({
  selector: 'app-my-complaints',
  templateUrl: './my-complaints.component.html',
  styleUrls: ['./my-complaints.component.css']
})
export class MyComplaintsComponent implements OnInit {

  complaints: Complaint [] = [];
  filteredComplaints: Complaint [] = [];
  expandedComplaintDetails: { [key: number]: boolean } = {};
  areAllExpanded: boolean = false;
  searchTerm: string = '';
  constructor(private complaintService: ComplaintService, private authService:AuthService) { }

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    const employeeId = this.authService.getUserId();
    if (employeeId)
    this.complaintService.getComplaintsBySenderId(employeeId).subscribe(
      complaints => {
        this.complaints = complaints;
        this.filteredComplaints = [...this.complaints];
      },
      error => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load complaints. Please try again later.',
          icon: 'error'
        });
      }
    );
  }

  toggleDetails(complaintId: number): void {
    this.expandedComplaintDetails[complaintId] = !this.expandedComplaintDetails[complaintId];
  }

  toggleAllDetails(): void {
    this.areAllExpanded = !this.areAllExpanded;
    this.complaints.forEach(complaint => {
      this.expandedComplaintDetails[complaint.idComplaint] = this.areAllExpanded;
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredComplaints = [...this.complaints];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      this.filteredComplaints = this.complaints.filter(complaint =>
        complaint.title.toLowerCase().includes(searchTermLower) ||
        complaint.description.toLowerCase().includes(searchTermLower) ||
        complaint.receiver.firstName.toLowerCase().includes(searchTermLower) ||
        complaint.receiver.lastName.toLowerCase().includes(searchTermLower)
      );
    }
  }
}
