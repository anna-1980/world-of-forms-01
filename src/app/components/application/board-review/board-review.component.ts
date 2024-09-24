import { Component } from '@angular/core';
import { Project } from '../../../models/project.model';
import { ProjectService } from '../services/project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board-review.component.html',
  styleUrl: './board-review.component.scss',
})
export class BoardReviewComponent {
  projects!: Project[] | null;
  isLoading = false;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects();

    // Subscribe to the projects observable
    this.projectService.projects$.subscribe((projects) => {
      this.projects = projects;
    });

    // Subscribe to the loading state (optional)
    this.projectService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

   
    viewProjectDetails(id: number): void {
      console.log(`Viewing details for project with ID: ${id}`);
   
      // this.router.navigate([`/projects/${id}`]);
    }
}
