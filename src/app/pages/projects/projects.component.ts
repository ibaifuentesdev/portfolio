import { Component } from '@angular/core';
import { ProjectItem } from '../../shared/models';
import { PROJECTS_DATA } from '../../shared/services/projects-data.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  protected readonly projects: readonly ProjectItem[] = PROJECTS_DATA;
}
