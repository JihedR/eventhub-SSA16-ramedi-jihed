import { Component } from '@angular/core';

// chargé en lazy loading (loadComponent dans app.routes.ts)
@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}
