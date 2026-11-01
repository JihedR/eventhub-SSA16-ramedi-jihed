import { Routes } from '@angular/router';
import { EventList } from './pages/event-list/event-list';
import { EventDetails } from './pages/event-details/event-details';
import { EventForm } from './pages/event-form/event-form';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: EventList },
  // avant events/:id, sinon « add » serait lu comme un id
  { path: 'events/add', component: EventForm },
  { path: 'events/:id', component: EventDetails },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  // wildcard : doit rester en dernier
  { path: '**', component: NotFound },
];
