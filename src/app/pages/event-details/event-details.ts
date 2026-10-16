import { Component, computed, input } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EVENTS } from '../../data/events.data';

@Component({
  selector: 'app-event-details',
  imports: [DatePipe, CurrencyPipe, UpperCasePipe, RouterLink],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetails {
  // :id de la route (withComponentInputBinding)
  id = input<string>();

  event = computed(() => EVENTS.find((e) => e.id === Number(this.id())));
}
