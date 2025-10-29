# Projet d'initiation à angular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.12.

## Development server

To start a local development server, make sure Angular CLI is installed globally and then run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Généralités
Une application web monopage (en anglais single-page application ou SPA) est une application web accessible via une page web unique. Son but est d'éviter le chargement d'une nouvelle page à chaque action demandée et de fluidifier ainsi l'expérience utilisateur : la quantité de données à télécharger est réduite et le navigateur web, au lieu de devoir réinitialiser toute la page, n'a qu'une partie à mettre à jour. (https://fr.wikipedia.org/wiki/Application_web_monopage)



## Fonctionnement global
Le navigateur charge l’application Angular (HTML + JS compilé). Angular initialise les modules et composants. Les composants (éléments d’interface) s’affichent grâce au data binding (liaison entre le code et le DOM). Les services gèrent la logique métier et la communication avec le backend (API REST, par ex.). Le routeur Angular permet de naviguer entre les vues sans recharger la page.

Une fois angular installé, on peut créer son propre projet en ligne de commande.

```bash
ng new nom_du_projet
```

Un projet est créé avec l'arborescence suivant:

nom_du_projet/
│
├── src/
│   ├── app/
│   │   ├── app.component.ts        # Composant racine
│   │   ├── app.component.html      # Template HTML du composant racine
│   │   ├── app.component.css       # Style du composant racine
│   │   ├── app.module.ts           # Module principal (déclare les composants, services, routes)
│   │   ├── components/             # Sous-dossier pour les composants
│   │   ├── services/               # Sous-dossier pour les services (logique, API, etc.)
│   │   └── pages/                  # Sous-dossier pour les pages complètes
│   │
│   ├── assets/                     # Images, icônes, fichiers statiques
│   ├── environments/
│   │   ├── environment.ts          # Config de dev
│   │   └── environment.prod.ts     # Config de prod
│   ├── index.html                  # Fichier HTML principal
│   └── main.ts                     # Point d’entrée de l’application (bootstrap du module principal)
│
├── angular.json                    # Configuration du build Angular
├── package.json                    # Dépendances npm
├── tsconfig.json                   # Configuration TypeScript
└── README.md


Pour créer un composant en ligne de commandes:
```bash
ng generate component components/nom_du_composant
```

Pour créer un service :
```bash
ng generate service services/nom_du_service

```
# Le composant (`.ts`, `.html`, `.css`)
Un composant est l’unité de base d’une application Angular. C’est un bloc d’interface réutilisable qui combine 3 fichiers:
- html : décrit la structure de l’interface (le template).
- css/scss : décrit le style (apparence visuelle).
- TypeScript : contient la logique (comportement, données, interactions).

Un composant est défini par une classe TypeScript annotée avec le décorateur @Component.


import { Component } from '@angular/core';
```bash
@Component({
  selector: 'app-header',                  // Nom de la balise HTML personnalisée
  templateUrl: './header.component.html',  // Fichier HTML associé
  styleUrls: ['./header.component.css']    // Fichier CSS associé
})
export class HeaderComponent {
  titre = 'Mon site Angular';              // Donnée accessible dans le template
}
```

# le module (`.module.ts`)
Il regroupe des composants, services et routes (ex : `AppModule`, `UserModule`).


# Le service (`.service.ts`)
Il contient la logique métier et les appels HTTP.

# Le routing (`app-routing.module.ts`)
Il définit les routes et les pages associées.

# Le template binding
Il décrit la liaison entre variables TypeScript et balises HTML (`{{ variable }}` ou `[attr]`, `(event)`).

# Directive / Pipe
Il s'agit des outils de manipulation du DOM ou de transformation des données (ex : `*ngFor`, date`).


## Choix techniques

# CommonModule

# OnInit

# ComponentFixture

# TestBed

