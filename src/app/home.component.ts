import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="container py-5">
      <h1 class="display-5 fw-bold">Portfolio</h1>
      <p class="lead mb-4">
        Fullstack Developer
      </p>

      <div class="row g-3">
        <div class="col-12 col-md-6">
          <div class="card">
            <div class="card-body">
              <h2 class="h5 card-title">Sobre mí</h2>
              <p class="card-text mb-0">
                Aquí pondremos tu resumen, stack y enlaces.
              </p>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="card">
            <div class="card-body">
              <h2 class="h5 card-title">Proyectos</h2>
              <p class="card-text mb-0">
                Aquí listaremos tus proyectos destacados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {}
