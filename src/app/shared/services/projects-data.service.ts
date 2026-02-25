import { ProjectItem } from '../models';

export const PROJECTS_DATA: readonly ProjectItem[] = [
  {
    title: 'Portfolio Angular Moderno',
    description: 'Este portfolio: Angular 19+ con theming dinámico, diseño responsive y componentes standalone.',
    technologies: ['Angular', 'TypeScript', 'Bootstrap', 'SCSS'],
    featured: true
  },
  {
    title: 'APIs REST escalables',
    description: 'Backend robusto con Spring Boot, JWT, documentación Swagger y persistencia multi-base de datos.',
    technologies: ['Spring Boot', 'Java', 'PostgreSQL', 'MongoDB', 'JWT'],
    featured: true
  },
  {
    title: 'Sistema de Gestión Industrial',
    description: 'Aplicación fullstack para control de producción y reportes en tiempo real.',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    link: '#',
    github: '#'
  },
  {
    title: 'Infraestructura Virtualizada',
    description: 'Gestión de entornos VMware con backups automatizados y alta disponibilidad.',
    technologies: ['VMware ESXi', 'PowerShell', 'Bash', 'Linux'],
    link: '#'
  }
] as const;
