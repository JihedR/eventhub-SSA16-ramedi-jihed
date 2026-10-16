import { Component, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventItem } from '../../models/event-item';

@Component({
  selector: 'app-event-card',
  imports: [DatePipe, CurrencyPipe, UpperCasePipe, RouterLink],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css',
})
export class EventCard {
  event = input.required<EventItem>();
  isFavorite = input(false);

  favoriteToggled = output<number>();

  onToggleFavorite() {
    this.favoriteToggled.emit(this.event().id);
  }
}
