import { Component, computed, signal } from '@angular/core';
import { EventCard } from '../../components/event-card/event-card';
import { EventItem } from '../../models/event-item';
import { EVENTS } from '../../data/events.data';

@Component({
  selector: 'app-event-list',
  imports: [EventCard],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList {
  events = signal<EventItem[]>(EVENTS);

  // ids des événements en favori
  favorites = signal<number[]>([]);
  favoritesCount = computed(() => this.favorites().length);

  categories = ['Tous', 'Atelier', 'Conférence', 'Compétition', 'Rencontre'];
  selectedCategory = signal('Tous');

  // liste affichée selon la catégorie choisie
  filteredEvents = computed(() => {
    if (this.selectedCategory() === 'Tous') {
      return this.events();
    }
    return this.events().filter((e) => e.category === this.selectedCategory());
  });

  selectCategory(category: string) {
    this.selectedCategory.set(category);
  }

  isFavorite(id: number) {
    return this.favorites().includes(id);
  }

  // appelée quand une carte émet favoriteClicked
  toggleFavorite(id: number) {
    if (this.isFavorite(id)) {
      this.favorites.update((list) => list.filter((x) => x !== id));
    } else {
      this.favorites.update((list) => [...list, id]);
    }
  }
}
