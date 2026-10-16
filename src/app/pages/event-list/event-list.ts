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
  favoriteIds = signal<number[]>([]);
  favoritesCount = computed(() => this.favoriteIds().length);

  selectedCategory = signal<string>('Tous');
  categories = ['Tous', 'Atelier', 'Conférence', 'Compétition', 'Rencontre'];

  filteredEvents = computed(() => {
    const category = this.selectedCategory();
    const all = this.events();
    return category === 'Tous' ? all : all.filter((e) => e.category === category);
  });

  selectCategory(category: string) {
    this.selectedCategory.set(category);
  }

  isFavorite(id: number): boolean {
    return this.favoriteIds().includes(id);
  }

  toggleFavorite(id: number) {
    // nouveau tableau sinon le signal ne voit pas le changement
    this.favoriteIds.update((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
    );
  }

  clearFavorites() {
    this.favoriteIds.set([]);
  }
}
