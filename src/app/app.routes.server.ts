import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'portretnaya-fotosessiya-v-tomske',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'predmetnaya-semka-v-tomske',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'reportazhnaya-semka-v-tomske',
    renderMode: RenderMode.Prerender
  }
];
