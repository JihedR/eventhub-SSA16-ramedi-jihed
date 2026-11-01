import { TestBed } from '@angular/core/testing';
import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;

  const newEvent = {
    title: 'Tournoi de foot',
    category: 'Sport',
    date: '2026-12-20',
    place: 'Terrain du campus',
    price: 0,
    imageUrl: '',
    description: 'Tournoi inter-classes ouvert à tous les étudiants.',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventService);
  });

  it('calcule les compteurs de départ', () => {
    expect(service.eventCount()).toBe(7);
    expect(service.favoriteCount()).toBe(0);
    expect(service.freeEventCount()).toBe(3);
  });

  it('ajoute un événement avec un nouvel id', () => {
    const added = service.addEvent(newEvent);
    expect(added.id).toBe(8);
    expect(service.eventCount()).toBe(8);
    expect(service.freeEventCount()).toBe(4);
    expect(service.getEventById(8)?.title).toBe('Tournoi de foot');
  });

  it("ne réutilise pas l'id d'un événement supprimé", () => {
    service.deleteEvent(7);
    const added = service.addEvent(newEvent);
    expect(added.id).toBe(8);
    expect(service.getEventById(7)).toBeUndefined();
  });

  it('retire un événement supprimé des favoris', () => {
    service.toggleFavorite(2);
    service.toggleFavorite(4);
    expect(service.favoriteCount()).toBe(2);
    service.deleteEvent(2);
    expect(service.getEventById(2)).toBeUndefined();
    expect(service.favorites()).toEqual([4]);
  });
});
