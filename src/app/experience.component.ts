import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer, DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

export interface ExperienceItem {
  readonly isCurrent: boolean;
  readonly title: string;
  readonly company: string;
  readonly employmentType?: string;
  readonly location?: string;
  readonly period: string;
  readonly startDate: string;
  readonly endDate?: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly skills: readonly string[];
  readonly icon?: string;
  readonly iconColor?: string;
}

interface JsonLdJobPosting {
  readonly '@context': string;
  readonly '@type': string;
  readonly title: string;
  readonly description: string;
  readonly hiringOrganization: {
    readonly '@type': string;
    readonly name: string;
  };
  readonly jobLocation?: {
    readonly '@type': string;
    readonly address: {
      readonly '@type': string;
      readonly addressLocality: string;
      readonly addressRegion: string;
      readonly addressCountry: string;
    };
  };
  readonly employmentType?: string;
  readonly datePosted: string;
  readonly validThrough?: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  template: `
    <div class="container py-5">
      <!-- Header SEO optimizado -->
      <header class="mb-5 text-center text-md-start">
        <h1 class="display-5 fw-bold mb-3">
          Experiencia Profesional
        </h1>
        <p class="lead text-body-secondary mb-4 max-w-3xl">
          Más de 3 años desarrollando soluciones tecnológicas para empresas de I+D, consultoras y startups. 
          Especializado en <strong>Spring Boot</strong>, <strong>Angular</strong> y arquitecturas fullstack.
        </p>
        
        <!-- Stats rápidas -->
        <div class="d-flex flex-wrap justify-content-center justify-content-md-start gap-4 gap-md-5">
          <div class="text-center">
            <div class="fw-bold h3 mb-1 text-primary">7</div>
            <div class="text-body-secondary small">Empresas</div>
          </div>
          <div class="text-center">
            <div class="fw-bold h3 mb-1 text-primary">3+</div>
            <div class="text-body-secondary small">Años</div>
          </div>
          <div class="text-center">
            <div class="fw-bold h3 mb-1 text-primary">15+</div>
            <div class="text-body-secondary small">Tecnologías</div>
          </div>
        </div>
      </header>

      <!-- Filtros integrados -->
      <section class="mb-5 p-4 rounded-4" style="background: rgba(var(--bs-body-bg-rgb), 0.6); backdrop-filter: blur(10px); border: 1px solid rgba(var(--bs-border-color-rgb), 0.2);" aria-label="Filtros de experiencia">
        <div class="d-flex flex-wrap align-items-center gap-3">
          <div class="d-flex align-items-center gap-2 text-body-secondary flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            <span class="fw-semibold small text-uppercase tracking-wide">Filtrar por stack</span>
          </div>
          
          <div class="d-flex flex-wrap gap-2 flex-grow-1">
            @for (skill of topFilterSkills; track skill) {
              <button
                type="button"
                class="btn btn-sm rounded-pill px-3 position-relative"
                [class.btn-primary]="selectedSkill === skill"
                [class.btn-outline-secondary]="selectedSkill !== skill"
                (click)="toggleSkillFilter(skill)"
                [attr.aria-pressed]="selectedSkill === skill"
              >
                {{ skill }}
                @if (selectedSkill === skill) {
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: 0.5rem;">
                    <span class="visually-hidden">Quitar filtro</span>×
                  </span>
                }
              </button>
            }
          </div>

          @if (selectedSkill) {
            <button
              type="button"
              class="btn btn-sm btn-link text-decoration-none text-body-secondary flex-shrink-0"
              (click)="clearFilter()"
            >
              Limpiar
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          }
        </div>
        
        @if (selectedSkill) {
          <div class="mt-3 pt-3 border-top" style="border-color: rgba(var(--bs-border-color-rgb), 0.2) !important;">
            <span class="small text-body-secondary">
              Mostrando <strong class="text-primary">{{ filteredExperience.length }}</strong> experiencias con <strong>{{ selectedSkill }}</strong>
            </span>
          </div>
        }
      </section>

      <!-- Timeline de experiencia -->
      <section class="app-timeline vstack gap-4" aria-label="Timeline de experiencia profesional">
        @for (item of filteredExperience; track item.title + item.company + item.period) {
          <article 
            class="app-timeline-item" 
            [class.is-current]="item.isCurrent"
            [attr.data-employment-type]="item.employmentType"
          >
            <!-- Icono del timeline -->
            <div class="app-timeline-icon" [style.background-color]="item.iconColor">
              <span>{{ item.icon }}</span>
            </div>
            
            <div class="app-timeline-content">
              <!-- Panel principal -->
              <div class="app-timeline-panel">
                <!-- Header con fecha destacada -->
                <div class="d-flex flex-column flex-md-row justify-content-between gap-2 mb-3">
                  <div class="flex-grow-1">
                    <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
                      <h2 class="h4 mb-0">{{ item.title }}</h2>
                      @if (item.isCurrent) {
                        <span class="badge bg-success">
                          <span class="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true"></span>
                          Actual
                        </span>
                      }
                    </div>
                    
                    <div class="d-flex flex-wrap align-items-center gap-2 text-body-secondary">
                      <span class="fw-semibold fs-5 text-primary">{{ item.company }}</span>
                      @if (item.employmentType) {
                        <span class="badge text-bg-light border">{{ item.employmentType }}</span>
                      }
                    </div>
                    
                    @if (item.location) {
                      <div class="mt-1 text-body-secondary small">
                        <span>📍 {{ item.location }}</span>
                      </div>
                    }
                  </div>
                  
                  <!-- Fecha destacada -->
                  <time class="app-timeline-date" [attr.datetime]="item.startDate">
                    <span class="badge text-bg-dark fs-6">{{ item.period }}</span>
                  </time>
                </div>

                <!-- Descripción -->
                <p class="lead text-body-secondary mb-3">{{ item.description }}</p>

                <!-- Highlights visuales -->
                @if (item.highlights.length > 0) {
                  <div class="mb-3">
                    <h3 class="h6 text-uppercase text-body-secondary mb-2 fw-semibold">
                      🎯 Logros principales
                    </h3>
                    <ul class="list-unstyled mb-0">
                      @for (h of item.highlights; track h) {
                        <li class="d-flex gap-2 mb-2">
                          <span class="text-success flex-shrink-0">✓</span>
                          <span>{{ h }}</span>
                        </li>
                      }
                    </ul>
                  </div>
                }

                <!-- Skills con contador -->
                <details class="app-details" [attr.open]="selectedSkill ? true : null">
                  <summary class="d-flex align-items-center gap-2 text-body-secondary py-2 border-top">
                    <span class="fw-semibold">🛠️ Tecnologías utilizadas</span>
                    <span class="badge text-bg-secondary">{{ item.skills.length }}</span>
                  </summary>
                  <div class="d-flex flex-wrap gap-2 pt-3">
                    @for (skill of item.skills; track skill) {
                      <span 
                        class="badge app-skill-pill"
                        [class.text-bg-primary]="selectedSkill === skill"
                        [class.text-bg-secondary]="selectedSkill !== skill"
                      >
                        {{ skill }}
                      </span>
                    }
                  </div>
                </details>
              </div>
            </div>
          </article>
        }
      </section>

      <!-- CTA al final -->
      <section class="mt-5 text-center">
        <div class="card app-card p-4">
          <h2 class="h4 mb-3">¿Interesado en mi experiencia?</h2>
          <p class="text-body-secondary mb-3">
            He trabajado con tecnologías modernas en entornos reales de producción. 
            ¿Tienes un proyecto donde pueda aportar valor?
          </p>
          <a class="btn btn-primary btn-lg" href="/contacto">Hablemos</a>
        </div>
      </section>
    </div>
  `
})
export class ExperienceComponent implements OnInit {
  protected selectedSkill: string | null = null;

  protected readonly experience: readonly ExperienceItem[] = [
    {
      isCurrent: true,
      title: 'Desarrollador de software',
      company: 'ARSONDATA METERING SL',
      employmentType: 'Jornada completa',
      location: 'Leioa/Elexalde, País Vasco, España · Presencial',
      period: 'oct. 2024 - actualidad',
      startDate: '2024-10-01',
      description: 'Desarrollo fullstack para proyectos de I+D, con foco en rendimiento, seguridad y adaptabilidad. Liderando implementación de APIs y dashboards analíticos.',
      highlights: [
        'Diseño e implementación de APIs REST escalables con Spring Boot y arquitectura hexagonal',
        'Optimización de consultas complejas en PostgreSQL y modelado de datos en MongoDB',
        'Desarrollo de interfaces dinámicas con Angular 17+, implementando SSR para mejor SEO'
      ],
      skills: ['Java', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'MongoDB', 'Angular', 'TypeScript', 'HTML', 'CSS', 'Swagger', 'Postman', 'Git', 'GitLab'],
    },
    {
      isCurrent: false,
      title: 'Desarrollador Fullstack & SysAdmin',
      company: 'EXENTIA SOLUTIONS SL',
      employmentType: 'Jornada completa',
      location: 'Bilbao, País Vasco, España · Presencial',
      period: 'jul. 2024 - ago. 2024',
      startDate: '2024-07-01',
      endDate: '2024-08-31',
      description: 'Desarrollo de aplicaciones web a medida y gestión de infraestructura IT para clientes del sector industrial, cubriendo tanto el desarrollo como la administración de sistemas.',
      highlights: [
        'Desarrollo de módulos personalizados en PHP con arquitectura MVC y optimización de bases de datos',
        'Administración de entornos virtualizados VMware ESXi/vSphere y políticas de backup automatizadas',
        'Implementación de interfaces responsive con Bootstrap 5 y gestión de dominios Windows Server'
      ],
      skills: ['PHP', 'Bootstrap', 'HTML5', 'CSS', 'JavaScript', 'Microsoft SQL Server', 'MySQL', 'jQuery', 'VMware ESXi', 'VMware vSphere', 'Linux', 'Windows Server', 'Bash', 'SSH', 'PowerShell', 'Backups', 'Administración de servidores']
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
      description: 'Automatización de procesos e integración de tecnologías frontend y backend para startup de turismo.',
      highlights: [
        'Integración de APIs de terceros (booking, pagos, mapas) en arquitectura microservicios',
        'Desarrollo de automatizaciones con Python y Node.js para procesos de marketing',
        'Implementación de CMS WordPress personalizado con plugins a medida'
      ],
      skills: ['Spring Boot', 'Java', 'Node.js', 'JavaScript', 'Python', 'Flask', 'HTML', 'CSS', 'Git', 'WordPress', 'REST APIs']
    },
    {
      isCurrent: false,
      title: 'Frontend Web Developer',
      company: 'LKS NEXT',
      employmentType: 'Contrato de prácticas',
      location: 'Bilbao, País Vasco, España',
      period: 'mar. 2023 - jun. 2023',
      startDate: '2023-03-01',
      endDate: '2023-06-30',
      description: 'Desarrollo frontend en equipo ágil para cliente del sector financiero, entregando interfaces dinámicas y escalables con alta cobertura de testing.',
      highlights: [
        'Desarrollo de componentes reutilizables con Angular 15+ y Angular Material',
        'Implementación de arquitectura NgRx para gestión de estado compleja',
        'Testing unitario y e2e con Jasmine, Karma y Cypress (90% cobertura)'
      ],
      skills: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Git', 'Azure DevOps', 'Jira', 'Metodologías ágiles', 'Scrum', 'RxJS']
    },
    {
      isCurrent: false,
      title: 'Desarrollador de WordPress',
      company: 'Ingenieros BIZKAIA',
      employmentType: 'Contrato de prácticas',
      location: 'Bilbao, País Vasco, España',
      period: 'mar. 2022 - jun. 2022',
      startDate: '2022-03-01',
      endDate: '2022-06-30',
      description: 'Web master y desarrollador WordPress para empresa de ingeniería, gestionando sitio corporativo con foco en UX, SEO técnico y seguridad.',
      highlights: [
        'Rediseño completo del sitio corporativo mejorando velocidad de carga en un 60%',
        'Implementación de SEO técnico: schema markup, lazy loading, optimización de imágenes',
        'Auditorías de seguridad y hardening de WordPress contra vulnerabilidades comunes'
      ],
      skills: ['WordPress', 'PHP', 'HTML', 'CSS', 'JavaScript', 'SEO', 'Yoast SEO', 'Google Analytics', 'Diseño web']
    },
    {
      isCurrent: false,
      title: 'IT Technician',
      company: 'Marlex Human Capital',
      employmentType: 'Contrato temporal',
      location: 'Bilbao, País Vasco, España',
      period: 'may. 2022',
      startDate: '2022-05-01',
      endDate: '2022-05-31',
      description: 'Soporte técnico especializado en TPVs para cadenas de retail, garantizando continuidad de servicio en horario comercial crítico.',
      highlights: [
        'Resolución de incidencias críticas de TPV en tiempo récord (< 15 min)',
        'Configuración de periféricos: impresoras térmicas, lectores de código de barras, cajones portamonedas',
        'Documentación técnica y creación de kbase para equipo de soporte nivel 1'
      ],
      skills: ['Soporte técnico', 'TPV', 'Mantenimiento hardware', 'Troubleshooting', 'Windows', 'Redes', 'Documentación técnica']
    }
  ];

  constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
    @Inject(PLATFORM_ID) private readonly platformId: object,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  ngOnInit(): void {
    // SEO: Título optimizado
    this.titleService.setTitle('Experiencia Profesional | Ibai Fuentes - Fullstack Developer Java & Angular');
    
    // SEO: Meta descripción
    this.metaService.updateTag({
      name: 'description',
      content: 'Experiencia profesional de Ibai Fuentes: 3+ años desarrollando con Spring Boot, Angular, PostgreSQL y MongoDB. ARSONDATA, EXENTIA, LKS NEXT y más.'
    });

    // SEO: Open Graph
    this.metaService.updateTag({ property: 'og:title', content: 'Experiencia Profesional | Ibai Fuentes Palacios' });
    this.metaService.updateTag({ property: 'og:description', content: 'Fullstack Developer especializado en Spring Boot y Angular. Historial en I+D, consultoras y startups.' });
    this.metaService.updateTag({ property: 'og:type', content: 'profile' });
    this.metaService.updateTag({ property: 'profile:first_name', content: 'Ibai' });
    this.metaService.updateTag({ property: 'profile:last_name', content: 'Fuentes Palacios' });

    // SEO: JSON-LD Structured Data
    if (isPlatformServer(this.platformId)) {
      this.injectJsonLd();
    }
  }

  private injectJsonLd(): void {
    const jobPostings: JsonLdJobPosting[] = this.experience.map(exp => ({
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: exp.title,
      description: exp.description,
      hiringOrganization: {
        '@type': 'Organization',
        name: exp.company
      },
      jobLocation: exp.location ? {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: exp.location.split('·')[0]?.trim().split(',')[0] || '',
          addressRegion: 'País Vasco',
          addressCountry: 'ES'
        }
      } : undefined,
      employmentType: this.mapEmploymentType(exp.employmentType),
      datePosted: exp.startDate,
      validThrough: exp.endDate || undefined
    }));

    const profileStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: 'Ibai Fuentes Palacios',
        jobTitle: 'Fullstack Developer',
        knowsAbout: ['Spring Boot', 'Angular', 'Java', 'TypeScript', 'PostgreSQL', 'MongoDB'],
        alumniOf: this.experience.map(exp => ({
          '@type': 'Organization',
          name: exp.company
        })),
        hasOccupation: jobPostings
      }
    };

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(profileStructuredData);
    this.document.head.appendChild(script);
  }

  private mapEmploymentType(type: string | undefined): string {
    if (!type) return 'OTHER';
    if (type.includes('completa')) return 'FULL_TIME';
    if (type.includes('parcial')) return 'PART_TIME';
    if (type.includes('prácticas')) return 'INTERN';
    if (type.includes('temporal')) return 'TEMPORARY';
    return 'OTHER';
  }

  protected get filteredExperience(): readonly ExperienceItem[] {
    if (!this.selectedSkill) {
      return this.experience;
    }

    const filter: string = this.selectedSkill;
    return this.experience.filter((e: ExperienceItem) => e.skills.includes(filter));
  }

  protected get topFilterSkills(): readonly string[] {
    const counts: Map<string, number> = new Map<string, number>();
    for (const exp of this.experience) {
      for (const skill of exp.skills) {
        counts.set(skill, (counts.get(skill) ?? 0) + 1);
      }
    }

    return [...counts.entries()]
      .sort((a: readonly [string, number], b: readonly [string, number]) => b[1] - a[1])
      .slice(0, 10)
      .map((entry: readonly [string, number]) => entry[0]);
  }

  protected toggleSkillFilter(skill: string): void {
    this.selectedSkill = this.selectedSkill === skill ? null : skill;
  }

  protected clearFilter(): void {
    this.selectedSkill = null;
  }
}
