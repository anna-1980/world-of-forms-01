import { Component } from '@angular/core';
import { LoginComponent } from "../forms/reactive-forms/login/login.component";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [LoginComponent, CommonModule, RouterOutlet],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

}
