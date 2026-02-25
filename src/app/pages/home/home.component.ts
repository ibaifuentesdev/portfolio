import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceItem, StatItem } from '../../shared/models';
import { ExperienceTimelineComponent } from '../../shared/components/experience-timeline/experience-timeline.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ExperienceTimelineComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected readonly linkedinUrl = 'https://www.linkedin.com/in/ibai-fuentes-palacios-92b043208/';
  protected readonly githubUrl = 'https://github.com/ibaifuentesdev';

  protected readonly stats: readonly StatItem[] = [
    { value: '4', label: 'Empresas' },
    { value: '3+', label: 'Años' },
    { value: '15+', label: 'Tecnologías' }
  ];

  protected readonly primaryStack: readonly string[] = [
    'Spring Boot',
    'Angular',
    'TypeScript',
    'Java',
    'PostgreSQL',
    'MongoDB',
    'REST APIs',
    'Testing',
    'Git',
    'Docker'
  ];

  protected readonly services: readonly ServiceItem[] = [
    {
      icon: '⚙️',
      title: 'Desarrollo Backend',
      description: 'APIs REST robustas con Spring Boot, seguridad JWT, documentación Swagger y bases de datos SQL/NoSQL.',
      stack: ['Spring Boot', 'Java', 'PostgreSQL', 'MongoDB', 'JWT']
    },
    {
      icon: '🎨',
      title: 'Desarrollo Frontend',
      description: 'Aplicaciones SPA con Angular, componentes reutilizables, gestión de estado con NgRx y testing automatizado.',
      stack: ['Angular', 'TypeScript', 'RxJS', 'Bootstrap', 'NgRx']
    },
    {
      icon: '🚀',
      title: 'Fullstack Completo',
      description: 'Desarrollo end-to-end desde la base de datos hasta la UI, con despliegue y DevOps básico.',
      stack: ['Spring Boot', 'Angular', 'Docker', 'GitLab CI', 'Linux']
    }
  ];
}
