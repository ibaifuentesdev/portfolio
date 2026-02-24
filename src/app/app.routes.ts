import { Routes } from '@angular/router';

import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';
import { ExperienceComponent } from './experience.component';
import { HomeComponent } from './home.component';
import { ProjectsComponent } from './projects.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'proyectos',
    component: ProjectsComponent
  },
  {
    path: 'experiencia',
    component: ExperienceComponent
  },
  {
    path: 'sobre-mi',
    component: AboutComponent
  },
  {
    path: 'contacto',
    component: ContactComponent
  }
];
