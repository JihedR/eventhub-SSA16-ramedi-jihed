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
  // données reçues du parent (EventList)
  event = input.required<EventItem>();
  isFavorite = input(false);

  // événement envoyé au parent avec l'id de l'événement
  favoriteClicked = output<number>();

  onFavoriteClick() {
    this.favoriteClicked.emit(this.event().id);
  }
}
