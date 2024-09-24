import { Routes } from '@angular/router';
import { ProjectApplicationComponent } from './components/application/project-application/project-application.component';
import { BoardReviewComponent } from './components/application/board-review/board-review.component';
import { FinanceReviewComponent } from './components/application/finance-review/finance-review.component';
import { FinalApprovalComponent } from './components/application/final-approval/final-approval.component';
import { BoardReviewDetailsComponent } from './components/application/board-review/board-review-details/board-review-details.component';
// import { LandingPageComponent } from './components/landing-page/landing-page.component';
// import { UsersComponent } from './components/users/users.component';
// import { MeetingsComponent } from './components/meetings/meetings.component';
// import { HomeComponent } from './components/home/home.component';
// import { DataComponent } from './components/data/data.component';
// import { SandboxComponent } from './components/sandbox/sandbox.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./components/users/users.component').then(
        (m) => m.UsersComponent
      ),
  },
  {
    path: 'user-details/:id',
    loadComponent: () =>
      import('./components/users/user-details/user-details.component').then(
        (m) => m.UserDetailsComponent
      ),
  },
  {
    path: 'meetings',
    loadComponent: () =>
      import('./components/meetings/meetings.component').then(
        (m) => m.MeetingsComponent
      ),
  },
  {
    path: 'data',
    loadComponent: () =>
      import('./components/data/data.component').then((m) => m.DataComponent),
  },
  {
    path: 'sandbox',
    loadComponent: () =>
      import('./components/sandbox/sandbox.component').then(
        (m) => m.SandboxComponent
      ),
  },
  { path: 'project-application', component: ProjectApplicationComponent }, // Applicant form
  {
    path: 'board-review',
    component: BoardReviewComponent,
  },
  {
    path: ':id/board-review-details',
    component: BoardReviewDetailsComponent,
  },
  { path: 'finance-review/:id', component: FinanceReviewComponent }, // Finance department review
  { path: 'final-approval/:id', component: FinalApprovalComponent }, // Board final approval
  { path: '', redirectTo: '/project-application', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
