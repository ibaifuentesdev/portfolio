import { Routes } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';

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
