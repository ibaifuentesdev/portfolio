import { Injectable } from '@angular/core';
import { ExperienceItem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private readonly experienceData: readonly ExperienceItem[] = [
    {
      isCurrent: true,
      title: 'Full-stack Developer',
      company: 'ARSONDATA METERING SL',
      employmentType: 'Jornada completa',
      location: 'Bilbao, País Vasco / Euskadi, España · Presencial',
      period: 'ene. 2025 - actualidad',
      startDate: '2025-01-01',
      endDate: undefined,
      description: 'Desarrollo de aplicaciones web a medida para el sector energético. Especializado en soluciones de medición inteligente con Spring Boot y Angular, implementando APIs REST robustas y frontend moderno.',
      highlights: [
        'Desarrollo de aplicaciones con Spring Boot y Angular',
        'Implementación de APIs RESTful y microservicios',
        'Integración de sistemas de medición energética',
        'Optimización de rendimiento y escalabilidad',
        'Trabajo con bases de datos PostgreSQL y MongoDB',
        'Implementación de seguridad JWT y OAuth2'
      ],
      skills: ['Spring Boot', 'Angular', 'TypeScript', 'PostgreSQL', 'MongoDB', 'REST APIs', 'JWT', 'OAuth2', 'Docker', 'Git']
    },
    {
      isCurrent: false,
      title: 'Desarrollador Fullstack & Administrador de sistemas',
      company: 'EXENTIA SOLUTIONS SL',
      employmentType: 'Jornada completa',
      location: 'Bilbao, País Vasco / Euskadi, España · Presencial',
      period: 'jul. 2024 - ago. 2024',
      startDate: '2024-07-01',
      endDate: '2024-08-31',
      description: 'Desarrollo de aplicaciones web personalizadas y gestión de infraestructura IT para clientes del sector industrial. Principal en desarrollo fullstack con PHP, HTML, CSS y JavaScript, junto con administración de sistemas ESXi y soluciones de backup.',
      highlights: [
        'Desarrollo de aplicaciones web personalizadas con PHP, HTML, CSS y JavaScript',
        'Gestión de bases de datos SQL Server y MySQL',
        'Administración de entornos virtualizados VMware ESXi/vSphere',
        'Implementación de soluciones de backup automatizadas y programación de scripts'
      ],
      skills: ['PHP', 'HTML', 'CSS', 'Bootstrap', 'Microsoft SQL Server', 'MySQL', 'JavaScript', 'jQuery', 'VMware ESXi', 'VMware vSphere', 'Windows Server', 'Active Directory', 'Redes', 'Backup', 'Scripts', 'Administración de sistemas']
    },
    {
      isCurrent: false,
      title: 'Full-stack Developer',
      company: 'Ven a Malta',
      employmentType: 'Contrato de prácticas',
      location: 'Malta · Presencial',
      period: 'mar. 2024 - jun. 2024',
      startDate: '2024-03-01',
      endDate: '2024-06-30',
      description: 'He liderado numerosos proyectos donde integré diversas tecnologías frontend y backend para automatizar procesos críticos dentro de la organización. Mediante la utilización experta de diversos tech stacks, he permitido a la empresa optimizar operaciones, mejorar la eficiencia y mantener una ventaja competitiva. Mi experiencia radica en crear soluciones robustas que no solo abordan necesidades inmediatas sino que también sientan las bases para un crecimiento sostenido e innovación.',
      highlights: [
        'Desarrollo de aplicaciones web completas con Angular y Spring Boot',
        'Implementación de APIs RESTful y microservicios escalables',
        'Integración de sistemas de pago y pasarelas online',
        'Optimización de rendimiento y experiencia de usuario',
        'Colaboración en metodologías ágiles y Scrum'
      ],
      skills: ['Angular', 'Spring Boot', 'TypeScript', 'Java', 'PostgreSQL', 'REST APIs', 'Testing', 'Scrum', 'Agile', 'Git', 'CI/CD']
    },
    {
      isCurrent: false,
      title: 'Desarrollador Fullstack',
      company: 'LKS NEXT',
      employmentType: 'Jornada completa',
      location: 'Bilbao, País Vasco / Euskadi, España · Presencial',
      period: 'oct. 2023 - feb. 2024',
      startDate: '2023-10-01',
      endDate: '2024-02-29',
      description: 'Desarrollo de aplicaciones empresariales con Angular y Spring Boot para clientes del sector industrial y financiero. Enfoque en la creación de soluciones escalables y mantenibles siguiendo las mejores prácticas de desarrollo de software.',
      highlights: [
        'Desarrollo de aplicaciones SPA con Angular 15+',
        'Creación de microservicios con Spring Boot',
        'Implementación de pruebas unitarias y de integración',
        'Optimización de rendimiento y accesibilidad web',
        'Trabajo con metodologías ágiles en equipos multidisciplinarios'
      ],
      skills: ['Angular', 'Spring Boot', 'TypeScript', 'Java', 'PostgreSQL', 'REST APIs', 'Unit Testing', 'Jest', 'Cypress', 'Docker', 'Jenkins']
    },
    {
      isCurrent: false,
      title: 'Desarrollador Web Junior',
      company: 'LKS NEXT',
      employmentType: 'Contrato en prácticas',
      location: 'Bilbao, País Vasco / Euskadi, España · Presencial',
      period: 'jun. 2023 - sep. 2023',
      startDate: '2023-06-01',
      endDate: '2023-09-30',
      description: 'Iniciación en el desarrollo web profesional con Angular y Spring Boot. Aprendizaje y aplicación de buenas prácticas de desarrollo, patrones de diseño y metodologías ágiles en proyectos reales para clientes empresariales.',
      highlights: [
        'Aprendizaje de Angular y TypeScript en entorno real',
        'Desarrollo de componentes reutilizables y servicios',
        'Introducción a Spring Boot y desarrollo backend',
        'Participación en reuniones de planificación ágil',
        'Implementación de correcciones de bugs y mejoras'
      ],
      skills: ['Angular', 'TypeScript', 'HTML', 'CSS', 'JavaScript', 'Spring Boot', 'Java', 'Git', 'Scrum', 'Testing']
    }
  ];

  getExperienceData(): readonly ExperienceItem[] {
    return this.experienceData;
  }

  getRecentExperiences(count: number = 3): readonly ExperienceItem[] {
    return this.experienceData.slice(0, count);
  }

  getExperienceByCompany(company: string): ExperienceItem | undefined {
    return this.experienceData.find(exp => exp.company === company);
  }

  getCurrentExperience(): ExperienceItem | undefined {
    return this.experienceData.find(exp => exp.isCurrent);
  }
}
