import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UsersComponent } from './components/users/users.component';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { HomeComponent } from './components/home/home.component';
import { DataComponent } from './components/data/data.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'meetings', component: MeetingsComponent },
  { path: 'data', component: DataComponent },
  // Redirect to home if no matching route is found
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
