import { Component } from '@angular/core';

export interface Project {
  readonly name: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly links: {
    readonly demo?: string;
    readonly repo?: string;
  };
}

@Component({
  selector: 'app-projects',
  standalone: true,
  template: `
    <div class="container py-5">
      <h1 class="h2 mb-4">Proyectos</h1>

      <div class="row g-3">
        @for (project of projects; track project.name) {
          <div class="col-12 col-lg-6">
            <div class="card h-100">
              <div class="card-body">
                <h2 class="h5 card-title mb-2">{{ project.name }}</h2>
                <p class="card-text">{{ project.description }}</p>

                <div class="d-flex flex-wrap gap-2 mb-3">
                  @for (tag of project.tags; track tag) {
                    <span class="badge text-bg-secondary">{{ tag }}</span>
                  }
                </div>

                <div class="d-flex gap-2">
                  @if (project.links.demo) {
                    <a class="btn btn-primary btn-sm" [href]="project.links.demo" target="_blank" rel="noopener">
                      Demo
                    </a>
                  }
                  @if (project.links.repo) {
                    <a class="btn btn-outline-primary btn-sm" [href]="project.links.repo" target="_blank" rel="noopener">
                      Código
                    </a>
                  }
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class ProjectsComponent {
  protected readonly projects: readonly Project[] = [
    {
      name: 'Proyecto 1',
      description: 'Descripción breve del proyecto (qué resuelve, qué aporta).',
      tags: ['Spring Boot', 'Angular', 'PostgreSQL'],
      links: {}
    },
    {
      name: 'Proyecto 2',
      description: 'Descripción breve del proyecto (qué resuelve, qué aporta).',
      tags: ['REST API', 'JWT', 'SSR'],
      links: {}
    }
  ];
}
