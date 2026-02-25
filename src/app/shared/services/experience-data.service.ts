import { ExperienceItem } from '../models';

export const EXPERIENCE_DATA: readonly ExperienceItem[] = [
  {
    isCurrent: true,
    title: 'Desarrollador de software',
    company: 'ARSONDATA METERING SL',
    employmentType: 'Jornada completa',
    location: 'Leioa/Elexalde, País Vasco / Euskadi, España · Presencial',
    period: 'oct. 2024 - actualidad',
    startDate: '2024-10-01',
    description: 'Experiencia en desarrollo de backend con Java, Spring, PostgreSQL y MongoDB, creando APIs y servicios escalables para proyectos de I+D con enfoque en rendimiento, seguridad y adaptabilidad. Competente en desarrollo frontend con Angular, creando interfaces dinámicas y responsive asegurando una integración perfecta de APIs para una experiencia de usuario completa.',
    highlights: [
      'Desarrollo de backend con Java, Spring, PostgreSQL y MongoDB',
      'Creación de APIs y servicios escalables para proyectos de I+D',
      'Enfoque en rendimiento, seguridad y adaptabilidad',
      'Desarrollo de frontend con Angular para interfaces dinámicas y responsive',
      'Integración perfecta de APIs para experiencia de usuario completa'
    ],
    skills: ['Java', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'MongoDB', 'Angular', 'TypeScript', 'REST APIs', 'Git', 'GitLab', 'CI/CD'],
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
    skills: ['PHP', 'HTML', 'CSS', 'Bootstrap', 'Microsoft SQL Server', 'MySQL', 'JavaScript', 'jQuery', 'VMware ESXi', 'VMware vSphere', 'Windows Server', 'Active Directory', 'Redes', 'Backup', 'Scripts', 'Administración de sistemas'],
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
      'Integración de tecnologías frontend y backend para automatizar procesos críticos',
      'Utilización de diversos tech stacks para optimizar operaciones',
      'Desarrollo de soluciones robustas para crecimiento sostenido',
      'Automatización de procesos para mejorar eficiencia'
    ],
    skills: ['Slack', 'Spring Boot', 'Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'REST APIs', 'Git', 'Agile'],
  },
  {
    isCurrent: false,
    title: 'Frontend Web Developer',
    company: 'LKS NEXT',
    employmentType: 'Contrato de prácticas',
    location: 'Bilbao, País Vasco / Euskadi, España',
    period: 'mar. 2023 - jun. 2023',
    startDate: '2023-03-01',
    endDate: '2023-06-30',
    description: 'Aproveché mi experiencia en desarrollo frontend web para diseñar y desarrollar sitios web visualmente atractivos y amigables para el usuario. Utilicé el framework Angular para crear aplicaciones web dinámicas y responsive. Colaboré con equipos interfuncionales para entender los requisitos del proyecto y entregar soluciones frontend de alta calidad.',
    highlights: [
      'Diseño y desarrollo de sitios web visualmente atractivos',
      'Creación de aplicaciones web dinámicas y responsive con Angular',
      'Colaboración con equipos interfuncionales para entender requisitos',
      'Implementación de APIs para integración de backend',
      'Testing y debugging para resolver problemas frontend'
    ],
    skills: ['HTML', 'Angular', 'TypeScript', 'JavaScript', 'CSS', 'Oracle Database', 'REST APIs', 'Git', 'Testing'],
  },
  {
    isCurrent: false,
    title: 'Desarrollador de WordPress',
    company: 'Colegio de Graduados en Ingeniería e Ingenieros Técnicos Industriales Bizkaia - Ingenieros BIZKAIA',
    employmentType: 'Contrato de prácticas',
    location: 'Bilbao, País Vasco / Euskadi, España',
    period: 'mar. 2022 - jun. 2022',
    startDate: '2022-03-01',
    endDate: '2022-06-30',
    description: 'Serví como Web Master para Escuela de Ingenieros Bilbao, gestionando y manteniendo el sitio web de la organización.',
    highlights: [
      'Gestión y mantenimiento del sitio web WordPress',
      'Administración de contenido y actualizaciones',
      'Soporte técnico para la plataforma web',
      'Coordinación con el equipo de la escuela'
    ],
    skills: ['WordPress', 'PHP', 'HTML', 'CSS', 'JavaScript', 'Web Master', 'Content Management', 'SEO'],
  }
] as const;
