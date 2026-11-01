import { Component, computed, inject, signal } from '@angular/core';
import { EventCard } from '../../components/event-card/event-card';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-list',
  imports: [EventCard],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList {
  private eventService = inject(EventService);

  // données et compteurs lus depuis le service
  events = this.eventService.events;
  eventCount = this.eventService.eventCount;
  favoriteCount = this.eventService.favoriteCount;
  freeEventCount = this.eventService.freeEventCount;

  categories = ['Tous', 'Atelier', 'Conférence', 'Compétition', 'Sport'];
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
    return this.eventService.isFavorite(id);
  }

  // appelée quand une carte émet favoriteClicked
  toggleFavorite(id: number) {
    this.eventService.toggleFavorite(id);
  }

  // appelée quand une carte émet deleteClicked
  deleteEvent(id: number) {
    if (confirm('Supprimer cet événement ?')) {
      this.eventService.deleteEvent(id);
    }
  }
}
