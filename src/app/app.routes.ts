import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UsersComponent } from './components/users/users.component';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { HomeComponent } from './components/home/home.component';
import { DataComponent } from './components/data/data.component';
import { LoginComponent } from './components/forms/reactive-forms/login/login.component';
import { RegisterComponent } from './components/forms/reactive-form/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent  
  },
  {path: 'login', component: LoginComponent}, 
    {path: 'register', component: RegisterComponent},
  { path: 'meetings', component: MeetingsComponent },
  { path: 'data', component: DataComponent },
  // Redirect to home if no matching route is found
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
