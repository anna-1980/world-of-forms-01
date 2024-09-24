import { Component } from '@angular/core';
import { UsersService } from './users.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  constructor(private usersService: UsersService) {
    this.users$ = this.usersService.users$;
  }

  users$!: Observable<User[] | null>;
  // users list observable

  ngOnInit(): void {
    console.log('UsersComponent ngOnInit', this.users$);
  }
}
