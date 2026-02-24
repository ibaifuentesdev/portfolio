import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ServiceItem {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly stack: readonly string[];
}

interface StatItem {
  readonly value: string;
  readonly label: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container py-5">
      <!-- Saludo destacado fuera del hero -->
      <div class="text-center mb-5">
        <div class="d-flex flex-column align-items-center gap-2">
          <div class="d-flex align-items-center gap-2">
            <span class="fs-2">👋</span>
            <span class="fs-3 text-body-secondary">Hola, soy</span>
          </div>
          <h1 class="display-1 fw-bold mb-1" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-shadow: 0 0 30px rgba(102, 126, 234, 0.3); letter-spacing: -0.02em;">Ibai Fuentes</h1>
          <span class="fs-5 text-uppercase tracking-wide text-body-secondary">Desarrollador Fullstack</span>
        </div>
      </div>

      <!-- Hero Section -->
      <section class="app-hero p-4 p-md-5 mb-5">
        <div class="row align-items-center g-4">
          <div class="col-12 col-lg-8">
            
            <!-- Badge de disponibilidad -->
            <div class="d-flex flex-wrap gap-2 mb-3">
              <span class="badge text-bg-success">Disponible para proyectos</span>
              <span class="badge text-bg-primary">Fullstack Developer</span>
              <span class="badge text-bg-secondary">Spring Boot + Angular</span>
            </div>

            <!-- Headline orientado a resultados -->
            <h1 class="display-5 fw-bold mb-3">
              Convierto tus ideas en aplicaciones web escalables
            </h1>

            <!-- Subheadline con propuesta de valor -->
            <p class="lead mb-4 text-body-secondary">
              Desarrollo soluciones fullstack con <strong>Spring Boot</strong> y <strong>Angular</strong> 
              para empresas que necesitan aplicaciones rápidas, seguras y mantenibles.
              Especializado en APIs REST, integración de sistemas externos y metodologías ágiles.
            </p>

            <!-- Social Proof rápido -->
            <div class="d-flex flex-wrap gap-4 gap-md-5 mb-4">
              @for (stat of stats; track stat.label) {
                <div class="text-center text-md-start">
                  <div class="fw-bold h4 mb-1 text-primary">{{ stat.value }}</div>
                  <div class="text-body-secondary small">{{ stat.label }}</div>
                </div>
              }
            </div>

            <!-- CTAs principales -->
            <div class="d-flex flex-wrap gap-2">
              <a class="btn btn-primary btn-lg" routerLink="/contacto">
                Hablemos de tu proyecto
              </a>
              <a class="btn btn-outline-primary" routerLink="/experiencia">
                Ver mi experiencia
              </a>
              <a class="btn btn-link" [href]="linkedinUrl" target="_blank" rel="noopener">
                LinkedIn →
              </a>
            </div>
          </div>

          <!-- Stack destacado -->
          <div class="col-12 col-lg-4">
            <div class="card app-card">
              <div class="card-body">
                <h2 class="h6 card-title mb-3 text-uppercase text-body-secondary">Stack Principal</h2>
                <div class="d-flex flex-wrap gap-2 mb-3">
                  @for (tech of primaryStack; track tech) {
                    <span class="badge text-bg-dark">{{ tech }}</span>
                  }
                </div>
                <hr class="my-3" />
                <div class="vstack gap-2 small">
                  <div class="d-flex justify-content-between">
                    <span class="text-body-secondary">Backend</span>
                    <span class="fw-semibold">Spring Boot · Java</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span class="text-body-secondary">Frontend</span>
                    <span class="fw-semibold">Angular · TypeScript</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span class="text-body-secondary">Bases de datos</span>
                    <span class="fw-semibold">PostgreSQL · MongoDB</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span class="text-body-secondary">DevOps</span>
                    <span class="fw-semibold">Git · GitLab · Docker</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Servicios / Cómo puedo ayudarte -->
      <section class="mb-5">
        <h2 class="h4 app-section-title mb-4 text-center text-md-start">Cómo puedo ayudar a tu empresa</h2>
        <div class="row g-4">
          @for (service of services; track service.title) {
            <div class="col-12 col-md-4">
              <div class="card app-card h-100">
                <div class="card-body d-flex flex-column">
                  <div class="mb-3 fs-3">{{ service.icon }}</div>
                  <h3 class="h5 mb-3">{{ service.title }}</h3>
                  <p class="text-body-secondary mb-4 flex-grow-1">{{ service.description }}</p>
                  <div class="d-flex flex-wrap gap-1 mt-auto">
                    @for (tech of service.stack; track tech) {
                      <span class="badge text-bg-light">{{ tech }}</span>
                    }
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Por qué trabajar conmigo
      <section class="mb-5">
        <div class="card app-card p-4">
          <div class="row align-items-center g-4">
            <div class="col-12 col-lg-8">
              <h2 class="h4 mb-3">¿Por qué contratar un fullstack especializado?</h2>
              <div class="row g-3">
                <div class="col-12 col-md-6">
                  <div class="d-flex align-items-start gap-3">
                    <span class="text-primary fs-5">✓</span>
                    <div>
                      <div class="fw-semibold mb-1">Un solo punto de contacto</div>
                      <div class="small text-body-secondary">Backend y frontend cohesionados desde el inicio</div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="d-flex align-items-start gap-3">
                    <span class="text-primary fs-5">✓</span>
                    <div>
                      <div class="fw-semibold mb-1">Menor time-to-market</div>
                      <div class="small text-body-secondary">Sin fricción entre equipos separados</div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="d-flex align-items-start gap-3">
                    <span class="text-primary fs-5">✓</span>
                    <div>
                      <div class="fw-semibold mb-1">Código mantenible</div>
                      <div class="small text-body-secondary">TypeScript estricto, testing, buenas prácticas</div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="d-flex align-items-start gap-3">
                    <span class="text-primary fs-5">✓</span>
                    <div>
                      <div class="fw-semibold mb-1">Testing de calidad</div>
                      <div class="small text-body-secondary">Testing unitario y e2e con Jasmine, Karma y Cypress</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-4 text-center text-lg-end">
              <a class="btn btn-primary btn-lg w-100" routerLink="/contacto">
                Solicitar información
              </a>
              <p class="small text-body-secondary mt-2 mb-0">
                Respuesta en menos de 24h
              </p>
            </div>
          </div>
        </div>
      </section> -->

      <!-- Proyectos destacados teaser -->
      <section class="mb-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2 class="h4 app-section-title mb-0">Proyectos recientes</h2>
          <a class="btn btn-outline-primary btn-sm" routerLink="/proyectos">Ver todos</a>
        </div>
        <div class="row g-3">
          <div class="col-12 col-md-6">
            <div class="card app-card h-100">
              <div class="card-body d-flex flex-column">
                <h3 class="h5 mb-3">Portfolio Angular Moderno</h3>
                <p class="text-body-secondary mb-3 flex-grow-1">
                  Este portfolio: Angular 19+ con theming dinámico, diseño responsive y componentes standalone.
                </p>
                <div class="d-flex flex-wrap gap-1 mb-3">
                  <span class="badge text-bg-light">Angular</span>
                  <span class="badge text-bg-light">TypeScript</span>
                  <span class="badge text-bg-light">Bootstrap</span>
                </div>
                <a class="btn btn-outline-primary btn-sm mt-auto align-self-start" routerLink="/proyectos">Ver detalles</a>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="card app-card h-100">
              <div class="card-body d-flex flex-column">
                <h3 class="h5 mb-3">APIs REST escalables</h3>
                <p class="text-body-secondary mb-3 flex-grow-1">
                  Múltiples proyectos con Spring Boot, PostgreSQL, MongoDB y documentación Swagger.
                </p>
                <div class="d-flex flex-wrap gap-1 mb-3">
                  <span class="badge text-bg-light">Spring Boot</span>
                  <span class="badge text-bg-light">PostgreSQL</span>
                  <span class="badge text-bg-light">MongoDB</span>
                </div>
                <a class="btn btn-outline-primary btn-sm mt-auto align-self-start" routerLink="/experiencia">Ver experiencia</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class HomeComponent {
  protected readonly linkedinUrl: string = 'https://www.linkedin.com/in/ibai-fuentes-palacios-92b043208/';

  protected readonly stats: readonly StatItem[] = [
    { value: '3+', label: 'Años de experiencia' },
    { value: '7', label: 'Proyectos profesionales' },
    { value: '15+', label: 'Tecnologías dominadas' }
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
