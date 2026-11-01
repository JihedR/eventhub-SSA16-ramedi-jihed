import { Component, computed, inject, input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-details',
  imports: [DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetails {
  private eventService = inject(EventService);

  // reçoit le paramètre :id de la route (withComponentInputBinding)
  id = input<string>();

  // undefined si aucun événement n'a cet id
  event = computed(() => this.eventService.getEventById(Number(this.id())));
}
