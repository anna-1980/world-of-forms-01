import { Component } from '@angular/core';
import { LoginComponent } from "../forms/reactive-forms/login/login.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

}
