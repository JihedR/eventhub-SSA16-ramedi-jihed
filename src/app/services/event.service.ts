import { Injectable, computed, signal } from '@angular/core';
import { EventItem } from '../models/event-item';

// source unique des événements, partagée par toutes les pages
@Injectable({ providedIn: 'root' })
export class EventService {
  // Signals privés : seul le service peut les modifier
  private _events = signal<EventItem[]>([
    {
      id: 1,
      title: 'Atelier TypeScript',
      category: 'Atelier',
      date: '2026-11-15',
      place: 'Campus, salle B12',
      price: 0,
      imageUrl: 'assets/typescript.svg',
      description:
        'Découverte de TypeScript : types, interfaces et génériques. Idéal avant de commencer Angular.',
    },
    {
      id: 2,
      title: 'Atelier Angular 21 & Signals',
      category: 'Atelier',
      date: '2026-11-22',
      place: 'Campus, Lab Web',
      price: 10,
      imageUrl: 'assets/angular.svg',
      description:
        'Création d’une application standalone : composants, Signals, control flow et routage.',
    },
    {
      id: 3,
      title: 'Atelier Git & GitHub',
      category: 'Atelier',
      date: '2026-12-03',
      place: 'Campus, salle A05',
      price: 0,
      imageUrl: 'assets/git.svg',
      description:
        'Commits, branches, pull requests et bonnes pratiques pour les projets en équipe.',
    },
    {
      id: 4,
      title: 'Conférence : l’IA dans le développement',
      category: 'Conférence',
      date: '2026-11-28',
      place: 'Amphithéâtre principal',
      price: 15,
      imageUrl: 'assets/ia.svg',
      description:
        'Comment les assistants IA changent la façon de concevoir, coder et tester les applications.',
    },
    {
      id: 5,
      title: 'Conférence : sécurité du cloud',
      category: 'Conférence',
      date: '2026-12-10',
      place: 'Amphithéâtre B',
      price: 20,
      imageUrl: 'assets/cloud.svg',
      description:
        'Erreurs de configuration fréquentes, gestion des identités et retours d’expérience terrain.',
    },
    {
      id: 6,
      title: 'Compétition CTF',
      category: 'Compétition',
      date: '2026-12-13',
      place: 'Campus, Lab Réseaux',
      price: 0,
      imageUrl: 'assets/cyber.svg',
      description: 'Capture The Flag en équipes de 4 : web, crypto, forensics et reverse.',
    },
    {
      id: 7,
      title: 'Hackathon 24h',
      category: 'Compétition',
      date: '2027-01-17',
      place: 'Espace coworking',
      price: 25,
      imageUrl: 'assets/hackathon.svg',
      description: '24 heures pour concevoir et présenter un prototype devant un jury.',
    },
  ]);

  // ids des événements en favori
  private _favorites = signal<number[]>([]);

  // prochain id libre : ne redescend jamais, même après une suppression
  private nextId = Math.max(...this._events().map((e) => e.id)) + 1;

  // versions en lecture seule pour les composants
  events = this._events.asReadonly();
  favorites = this._favorites.asReadonly();

  // compteurs recalculés automatiquement
  eventCount = computed(() => this._events().length);
  favoriteCount = computed(() => this._favorites().length);
  freeEventCount = computed(() => this._events().filter((e) => e.price === 0).length);

  getEventById(id: number) {
    return this._events().find((e) => e.id === id);
  }

  // l'id n'est pas fourni : il est généré ici
  addEvent(event: Omit<EventItem, 'id'>) {
    const newEvent: EventItem = { ...event, id: this.nextId };
    this.nextId++;
    this._events.update((list) => [...list, newEvent]);
    return newEvent;
  }

  deleteEvent(id: number) {
    this._events.update((list) => list.filter((e) => e.id !== id));
    // un événement supprimé ne doit pas rester dans les favoris
    this._favorites.update((list) => list.filter((x) => x !== id));
  }

  isFavorite(id: number) {
    return this._favorites().includes(id);
  }

  toggleFavorite(id: number) {
    if (this.isFavorite(id)) {
      this._favorites.update((list) => list.filter((x) => x !== id));
    } else {
      this._favorites.update((list) => [...list, id]);
    }
  }
}
