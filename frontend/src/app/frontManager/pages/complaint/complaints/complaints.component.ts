import { Component, OnInit } from '@angular/core';
import {Complaint} from "../../../../models/Complaint";
import {ComplaintService} from "../../../../services/complaint/complaint.service";
import {AuthService} from "../../../../services/authenticate/auth.service";
import {Router} from "@angular/router";

declare var Swal: any;
@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
  complaints: Complaint[] = [];
  filteredComplaints: Complaint [] = [];
  expandedComplaintDetails: { [key: number]: boolean } = {};
  areAllExpanded: boolean = false;
  searchTerm: string='';

  constructor(private complaintService: ComplaintService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    const managerId = this.authService.getUserId();
    if (managerId)
      this.complaintService.getComplaintsByReceiverId(managerId).subscribe(
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

  deleteComplaint(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5D87FF',
      cancelButtonColor: '#FA896B',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.complaintService.deleteComplaint(id).subscribe(
          () => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Complaint deleted successfully",
              showConfirmButton: false,
              timer: 1500
            });

            this.complaints = this.complaints.filter(complaint => complaint.idComplaint !== id);
            this.filteredComplaints = this.filteredComplaints.filter(complaint=>complaint.idComplaint !== id);
          },
          error => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete complaint. Please try again later.',
              icon: 'error'
            });
          }
        );
      }
    });
  }

  handleComplaint(complaint: Complaint) : void {
    complaint.status = true;

    this.complaintService.updateComplaint(complaint.idComplaint, complaint).subscribe(
      () => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Complaint handled successfully',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error updating complaint',
          text: error.message || 'An error occurred while updating the complaint.'
        });
      }
    );
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredComplaints = [...this.complaints];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      this.filteredComplaints = this.complaints.filter(complaint =>
        complaint.title.toLowerCase().includes(searchTermLower) ||
        complaint.description.toLowerCase().includes(searchTermLower) ||
        complaint.sender.firstName.toLowerCase().includes(searchTermLower) ||
        complaint.sender.lastName.toLowerCase().includes(searchTermLower)
      );
    }
  }
}
