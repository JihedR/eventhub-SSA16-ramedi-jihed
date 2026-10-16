# EventHub – Mini-projet Angular 21

Application Angular standalone qui présente les activités d'une association étudiante
(ateliers, conférences, compétitions). Le visiteur peut consulter la liste des événements,
les filtrer par catégorie, afficher le détail d'un événement et gérer une sélection de favoris.

Projet 100 % côté client : les données sont définies dans le code TypeScript
(pas d'API, pas de base de données, pas d'authentification).

**Auteur :** Jihed Ramedi

## Versions utilisées

| Outil       | Version  |
| ----------- | -------- |
| Angular     | 21.2.x   |
| Angular CLI | 21.2.x   |
| Node.js     | 22.x (compatible ^20.19 / ^22.12 / ^24) |
| TypeScript  | 5.9.x    |

## Installation et lancement

```bash
git clone https://github.com/JihedR/eventhub-SSA16-ramedi-jihed.git
cd eventhub-SSA16-ramedi-jihed
npm install
ng serve --open
```

L'application est disponible sur http://localhost:4200 (redirection automatique vers `/events`).

## Structure des composants

```
src/app/
├── app.ts / app.html          Composant racine : Header + <router-outlet>
├── app.routes.ts              Définition des routes (dont lazy loading de /about)
├── app.config.ts              provideRouter + withComponentInputBinding, locale fr-FR
├── models/event-item.ts       Interface EventItem
├── data/events.data.ts        Jeu de données (7 événements, 3 catégories, 3 gratuits)
├── components/
│   ├── header/                Header
│   └── event-card/            EventCard
└── pages/
    ├── event-list/            EventList
    ├── event-details/         EventDetails
    ├── not-found/             NotFound
    └── about/                 About (chargé en lazy loading)
```

| Composant        | Rôle |
| ---------------- | ---- |
| **Header**       | Affiche le titre de l'application et le menu de navigation. Utilise `routerLink` et `routerLinkActive` pour mettre en évidence la page active. |
| **EventList**    | Page principale (parent). Stocke la liste, les favoris et la catégorie sélectionnée dans des Signals, et affiche les cartes filtrées avec `@for` / `@empty`. |
| **EventCard**    | Composant de présentation (enfant). Reçoit un événement via `input()`, l'affiche avec des pipes, et signale le clic « favori » au parent via `output()`. |
| **EventDetails** | Page `/events/:id`. Récupère l'identifiant de la route via `input()` (grâce à `withComponentInputBinding()`) et affiche l'événement, ou un message si l'id n'existe pas. |
| **NotFound**     | Page affichée par la route `**` pour toute URL inconnue. |
| **About**        | Page de présentation du projet, chargée à la demande avec `loadComponent()`. |

## Fonctionnalités réalisées

- **Signals** : `events`, `favoriteIds`, `selectedCategory` (`signal()`), modifiés avec `set()` et `update()`.
  Le compteur `favoritesCount` et la liste `filteredEvents` sont des `computed()` dérivés de ces Signals.
- **Data binding** : interpolation `{{ }}`, property binding (`[src]`, `[alt]`, `[class.active]`, `[routerLink]`), event binding (`(click)`).
- **Control flow** : `@for (...; track event.id)`, `@empty` (« Aucun événement disponible »), `@if / @else` (gratuit / payant, favori / non favori, événement trouvé / introuvable).
- **Pipes intégrés** : `date`, `currency` (TND), `uppercase`, avec la locale française.
- **Parent / enfant** : `input.required<EventItem>()` et `input()` dans EventCard, `output<number>()` pour le favori.
- **Filtre par catégorie** : Tous / Atelier / Conférence / Compétition / Rencontre (la catégorie « Rencontre » n'a pas encore d'événement, ce qui permet de vérifier le bloc `@empty`).
- **Routage** : `/events`, `/events/:id`, `/about`, `**`, redirection de `''` vers `/events`.
- **Lazy loading** : `/about` est chargé avec `loadComponent()` ; un chunk JS séparé (`about`) est téléchargé lors de la première navigation (visible dans l'onglet Network).
- **Responsive** : grille de cartes adaptative (CSS Grid `auto-fill`), mise en page testée sur ordinateur et téléphone.

## Choix techniques

- **Données dans un fichier séparé** (`events.data.ts`) : EventList les stocke dans un Signal, et EventDetails en a aussi besoin pour chercher un événement par id. Un fichier partagé évite de dupliquer le tableau.
- **Favoris stockés sous forme d'ids** : plus simple à comparer qu'un objet et évite les doublons. Le nombre de favoris est calculé (`computed`) pour ne jamais être désynchronisé.
- **`update()` avec un nouveau tableau** (`[...ids, id]` / `filter`) : un Signal détecte un changement de référence ; modifier le tableau en place (`push`) ne déclencherait pas la mise à jour.
- **EventCard sans état** : la carte ne fait qu'émettre un événement ; c'est le parent qui décide et modifie l'état. Une seule source de vérité.
- **`input()` + `withComponentInputBinding()`** plutôt qu'`ActivatedRoute` : moins de code, et l'id est directement un Signal.
- **Route `**` en dernier** : le routeur choisit la première route qui correspond.

## Tests manuels

| Cas testé | Résultat attendu | OK |
| --------- | ---------------- | -- |
| Affichage initial | `/` redirige vers `/events`, 7 cartes affichées | ✅ |
| Filtre | « Atelier » affiche 3 cartes, « Tous » les 7 | ✅ |
| Liste vide | « Rencontre » affiche « Aucun événement disponible » | ✅ |
| Ajout / retrait favoris | Le compteur passe à 2 puis 1, la carte change d'apparence | ✅ |
| Navigation vers un détail | « Voir les détails » ouvre `/events/2` avec le bon événement | ✅ |
| Identifiant inexistant | `/events/999` affiche « Événement introuvable » | ✅ |
| Lien actif | Le lien du menu de la page courante est mis en évidence | ✅ |
| URL inconnue | `/blabla` affiche la page 404 | ✅ |
| Chargement de /about | Un chunk JS supplémentaire est chargé à la première visite | ✅ |

## Captures d'écran

**Liste des événements**
![Liste](docs/screenshots/01-liste.png)

**Filtre « Conférence » et favori actif**
![Filtre et favoris](docs/screenshots/02-filtre-favoris.png)

**Détail d'un événement**
![Détails](docs/screenshots/04-details.png)

**Affichage mobile**

<img src="docs/screenshots/05-mobile.png" alt="Mobile" width="300" />
