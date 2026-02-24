import { Component } from '@angular/core';

export interface SkillGroup {
  readonly title: string;
  readonly items: readonly string[];
}

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="container py-5">
      <h1 class="h2 mb-4">Sobre mí</h1>

      <div class="row g-3">
        <div class="col-12 col-lg-6">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="h5 card-title">Ibai Fuentes Palacios</h2>
              <p class="card-text mb-0">
                Fullstack developer especializado en Spring Boot y Angular.
              </p>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-6">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="h5 card-title">Stack</h2>
              <div class="vstack gap-3">
                @for (group of skillGroups; track group.title) {
                  <div>
                    <div class="fw-semibold mb-2">{{ group.title }}</div>
                    <div class="d-flex flex-wrap gap-2">
                      @for (item of group.items; track item) {
                        <span class="badge text-bg-secondary">{{ item }}</span>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent {
  protected readonly skillGroups: readonly SkillGroup[] = [
    {
      title: 'Backend',
      items: ['Spring Boot', 'Spring Security', 'JPA/Hibernate', 'REST APIs']
    },
    {
      title: 'Frontend',
      items: ['Angular', 'RxJS', 'TypeScript', 'SSR']
    },
    {
      title: 'Data / DevOps',
      items: ['PostgreSQL', 'Docker', 'CI/CD']
    }
  ];
}
