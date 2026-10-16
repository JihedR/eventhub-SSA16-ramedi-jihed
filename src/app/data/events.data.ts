import { EventItem } from '../models/event-item';

export const EVENTS: EventItem[] = [
  {
    id: 1,
    title: 'Atelier TypeScript',
    category: 'Atelier',
    date: '2026-11-15',
    place: 'Campus, salle B12',
    price: 0,
    imageUrl: 'assets/typescript.svg',
    description:
      'Découverte de TypeScript : types, interfaces et génériques. Idéal avant de commencer Angular.',
  },
  {
    id: 2,
    title: 'Atelier Angular 21 & Signals',
    category: 'Atelier',
    date: '2026-11-22',
    place: 'Campus, Lab Web',
    price: 10,
    imageUrl: 'assets/angular.svg',
    description:
      'Création d’une application standalone : composants, Signals, control flow et routage.',
  },
  {
    id: 3,
    title: 'Atelier Git & GitHub',
    category: 'Atelier',
    date: '2026-12-03',
    place: 'Campus, salle A05',
    price: 0,
    imageUrl: 'assets/git.svg',
    description: 'Commits, branches, pull requests et bonnes pratiques pour les projets en équipe.',
  },
  {
    id: 4,
    title: 'Conférence : l’IA dans le développement',
    category: 'Conférence',
    date: '2026-11-28',
    place: 'Amphithéâtre principal',
    price: 15,
    imageUrl: 'assets/ia.svg',
    description:
      'Comment les assistants IA changent la façon de concevoir, coder et tester les applications.',
  },
  {
    id: 5,
    title: 'Conférence : sécurité du cloud',
    category: 'Conférence',
    date: '2026-12-10',
    place: 'Amphithéâtre B',
    price: 20,
    imageUrl: 'assets/cloud.svg',
    description:
      'Erreurs de configuration fréquentes, gestion des identités et retours d’expérience terrain.',
  },
  {
    id: 6,
    title: 'Compétition CTF',
    category: 'Compétition',
    date: '2026-12-13',
    place: 'Campus, Lab Réseaux',
    price: 0,
    imageUrl: 'assets/cyber.svg',
    description: 'Capture The Flag en équipes de 4 : web, crypto, forensics et reverse.',
  },
  {
    id: 7,
    title: 'Hackathon 24h',
    category: 'Compétition',
    date: '2027-01-17',
    place: 'Espace coworking',
    price: 25,
    imageUrl: 'assets/hackathon.svg',
    description: '24 heures pour concevoir et présenter un prototype devant un jury.',
  },
];
