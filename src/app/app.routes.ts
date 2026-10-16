import { Routes } from '@angular/router';
import { EventList } from './pages/event-list/event-list';
import { EventDetails } from './pages/event-details/event-details';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: EventList },
  { path: 'events/:id', component: EventDetails },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  // wildcard : doit rester en dernier
  { path: '**', component: NotFound },
];
