import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';
import { ServicePageComponent } from './pages/service/service-page.component';
import { portraitService, reportageService, subjectService } from './pages/service/service-page.data';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: portraitService.path,
    component: ServicePageComponent,
    data: { service: portraitService }
  },
  {
    path: subjectService.path,
    component: ServicePageComponent,
    data: { service: subjectService }
  },
  {
    path: reportageService.path,
    component: ServicePageComponent,
    data: { service: reportageService }
  }
];
