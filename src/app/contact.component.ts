import { Component } from '@angular/core';

interface ContactLink {
  readonly label: string;
  readonly href: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <div class="container py-5">
      <h1 class="h2 mb-4">Contacto</h1>

      <div class="row g-3">
        <div class="col-12 col-lg-6">
          <div class="card">
            <div class="card-body">
              <h2 class="h5 card-title">Links</h2>
              <div class="list-group list-group-flush">
                @for (link of links; track link.href) {
                  <a class="list-group-item list-group-item-action" [href]="link.href" target="_blank" rel="noopener">
                    {{ link.label }}
                  </a>
                }
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-6">
          <div class="card">
            <div class="card-body">
              <h2 class="h5 card-title">Email</h2>
              <p class="card-text">
                Si quieres, añadimos un formulario que dispare a un endpoint de Spring Boot.
              </p>
              <a class="btn btn-primary" href="mailto:tu-email@ejemplo.com">Escríbeme</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ContactComponent {
  protected readonly links: readonly ContactLink[] = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ibai-fuentes-palacios-92b043208/'
    }
  ];
}
