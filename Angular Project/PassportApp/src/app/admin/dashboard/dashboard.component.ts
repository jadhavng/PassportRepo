import { Component, OnInit, NgModule } from '@angular/core';

import { UserService } from 'src/app/UserDataService.service';
import { UserFormComponent } from '../user-form/user-form.component'; // Update the path to the actual location of UserFormComponent
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  editingUser: any = null;
  public selectedUserId!: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (response: any[]) => {
        this.users = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updateStatus(user: any) {
    // Perform API call to update user status in the database
    this.userService.updateUserStatus(user.id, user.status).subscribe(
      (response) => {
        console.log('User status updated successfully');
      },
      (error) => {
        console.error('Error updating user status:', error);
      }
    );
  }

  editUser(user: any) {
    // Set the editingUser to the selected user
    this.editingUser = user;
  }

  cancelEdit() {
    // Reset the editingUser back to null to cancel editing
    this.editingUser = null;
  }

  saveUser() {
    // Perform API call to save the edited user details in the database
    this.userService.updateUser(this.editingUser).subscribe(
      (response) => {
        console.log('User details updated successfully');
        this.editingUser = null; // Reset editingUser after saving
      },
      (error) => {
        console.error('Error updating user details:', error);
      }
    );
  }

  deleteUser(user: any) {
    // Perform API call to delete user from the database
    this.userService.deleteUser(user.id).subscribe(
      (response) => {
        console.log('User deleted successfully');
        // Remove the user from the local users array
        const index = this.users.indexOf(user);
        if (index !== -1) {
          this.users.splice(index, 1);
        }
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  displayUserForm(userId: string) {
    console.log('Selected User ID:', userId); // Check the value of userId
    this.selectedUserId = userId;
    this.router.navigate(['userForm', userId]);
  }
}
