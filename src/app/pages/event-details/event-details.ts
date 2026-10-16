import { Component, computed, input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EVENTS } from '../../data/events.data';

@Component({
  selector: 'app-event-details',
  imports: [DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetails {
  // reçoit le paramètre :id de la route (withComponentInputBinding)
  id = input<string>();

  // undefined si aucun événement n'a cet id
  event = computed(() => EVENTS.find((e) => e.id === Number(this.id())));
}
