import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation/navigation.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UsersService } from './components/users/users.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, LandingPageComponent, NavigationComponent]
})
export class AppComponent {
  title = 'world-of-forms-01';

  constructor(private usersService: UsersService){}
  ngOnInit(): void {
    this.usersService.getUsers();
  }
}
