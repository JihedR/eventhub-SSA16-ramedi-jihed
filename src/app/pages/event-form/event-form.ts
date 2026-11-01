import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-form',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './event-form.html',
  styleUrl: './event-form.css',
})
export class EventForm {
  private eventService = inject(EventService);
  private router = inject(Router);

  categories = ['Atelier', 'Conférence', 'Sport'];

  // nonNullable : reset() remet la valeur de départ au lieu de null
  eventForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
    }),
    category: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    date: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    place: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    imageUrl: new FormControl('', { nonNullable: true }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(20)],
    }),
  });

  // Observables du formulaire convertis en Signals (affichés sous le formulaire)
  formValue = toSignal(this.eventForm.valueChanges, { initialValue: this.eventForm.value });
  formStatus = toSignal(this.eventForm.statusChanges, { initialValue: this.eventForm.status });

  addEvent() {
    if (this.eventForm.invalid) {
      // affiche les messages d'erreur de tous les champs
      this.eventForm.markAllAsTouched();
      return;
    }

    const values = this.eventForm.getRawValue();

    // l'id est attribué par le service
    this.eventService.addEvent({
      ...values,
      imageUrl: values.imageUrl || 'assets/default.svg',
    });

    this.eventForm.reset();
    this.router.navigate(['/events']);
  }
}
