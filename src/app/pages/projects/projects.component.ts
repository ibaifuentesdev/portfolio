import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProjectItem } from '../../shared/models';
import { ProjectsDataService } from '../../shared/services/projects-data.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects$!: Observable<ProjectItem[]>;

  constructor(private projectsDataService: ProjectsDataService) {}

  ngOnInit(): void {
    this.projects$ = this.projectsDataService.getProjectsData();
  }
}
