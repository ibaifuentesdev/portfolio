import { Component } from '@angular/core';

export interface SkillGroup {
  readonly title: string;
  readonly items: readonly string[];
}

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
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
