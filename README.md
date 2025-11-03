# Projet d'initiation à angular

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 19.2.12. Pour démarrer un serveur de développement local, assurez-vous qu'Angular CLI est installé globalement, puis exécutez :

```bash
ng serve
```

Une fois le serveur lancé, ouvrez votre navigateur et accédez à `http://localhost:4200/`. L'application se rechargera automatiquement à chaque modification des fichiers sources.

L'application utilise Node.js en backend. Pour lancer le serveur backend, éxecuter :

```bash
node server.js
```
Il est possible de lancer les deux serveur en même temps. Assurez-vous d'installer concurrently (`npm install --save-dev concurrently`) et éxecutez la commande suivante:
```bash
ng npm start
```

Pour compiler le projet, exécutez :

```bash
ng build
```

Cette commande compilera votre projet et enregistrera les fichiers de compilation dans le répertoire `dist/`. Par défaut, la configuration de production optimise votre application pour des performances et une vitesse accrues.

Pour exécuter des tests unitaires avec le lanceur de tests [Karma](https://karma-runner.github.io), utilisez la commande suivante :

```bash
ng test
```

pours des tests end-to-end (e2e), exécutez:

```bash
ng e2e
```

L'interface de ligne de commande Angular (CLI) n'intègre pas de framework de tests de bout en bout par défaut. Vous pouvez en choisir un qui corresponde à vos besoins.

Pour plus d'informations sur l'utilisation de la CLI Angular, notamment une documentation détaillée des commandes, consultez la page [Présentation et documentation de référence de la CLI Angular](https://angular.dev/tools/cli).


# Généralités
Une application web monopage (en anglais single-page application ou SPA) est une application web accessible via une page web unique. Son but est d'éviter le chargement d'une nouvelle page à chaque action demandée et de fluidifier ainsi l'expérience utilisateur : la quantité de données à télécharger est réduite et le navigateur web, au lieu de devoir réinitialiser toute la page, n'a qu'une partie à mettre à jour. (https://fr.wikipedia.org/wiki/Application_web_monopage)

Le navigateur charge l’application Angular (HTML + JS compilé). Angular initialise les modules et composants. Les composants (éléments d’interface) s’affichent grâce au data binding (liaison entre le code et le DOM). Les services gèrent la logique métier et la communication avec le backend (API REST, par ex.). Le routeur Angular permet de naviguer entre les vues sans recharger la page. Une fois angular installé, on peut créer son propre projet en ligne de commande.

```bash
ng new nom_du_projet
```

Un projet est créé avec l'arborescence suivant:

```bash
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
```
Angular CLI inclut de puissants outils de génération de code.Pour créer un composant en ligne de commandes:
```bash
ng generate component components/nom_du_composant
```

Pour créer un service :
```bash
ng generate service services/nom_du_service

```

Pour obtenir la liste complète des schémas disponibles (tels que `components`, `directives` ou `pipes`), exécutez :

```bash
ng generate --help
```

# Concepts généraux

# Le composant (`.ts`, `.html`, `.css`)
Un composant est l’unité de base d’une application Angular. C’est un bloc d’interface réutilisable qui combine 3 fichiers:
- html : décrit la structure de l’interface (le template).
- css/scss : décrit le style (apparence visuelle).
- TypeScript : contient la logique (comportement, données, interactions).

Utiliser du SCSS (Sassy CSS) au lieu du CSS permet une organisation plus structurée du code (en utilisant des fonctionnalités avancées comme des variables, des boucles, et des fonctions), facilitant ainsi la maintenance et l'extension des stylesheets.

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

## le module (`.module.ts`)
Il regroupe des composants, services,des directives, des pipes et routes qui sont associés. Ex : `AppModule`, `UserModule`. Tout comme les classes sont utilisées pour regrouper des méthodes et des propriétés dans la programmation orientée objet, les modules Angular sont utilisés pour regrouper des fonctionnalités. Si vous avez un ensemble de fonctionnalités que vous souhaitez réutiliser dans différentes parties de votre application ou dans d'autres applications, vous devriez probablement les regrouper dans un module. Si vous souhaitez étendre votre application avec des plugins ou des fonctionnalités supplémentaires à l'avenir, les modules peuvent rendre cela beaucoup plus facile.

Lors de la création d'une application : Angular recommande d'avoir au moins un module racine, habituellement appelé `AppModule`.

## Le service (`.service.ts`)
Le service contient la logique métier et les appels HTTP. Il permet de séparer les données et les fonctions qui peuvent être utilisées par plusieurs composants. Pour être utilisable par plusieurs composants, un service doit être injectable. Les services injectables utilisés par un composant deviennent des dépendances de ce composant. Le composant dépend de ces services et ne peut pas fonctionner sans eux.

# Autres concepts

### Lazy loading
Angular permet le chargement paresseux des modules. Si une certaine partie de votre application n'est pas nécessairement chargée au démarrage, vous pouvez la mettre dans un module séparé et la charger uniquement lorsque c'est nécessaire.

### Le routing (`app-routing.module.ts`)
Il définit les routes et les pages associées. Dans une application monopage, l'affichage est modifié en affichant ou en masquant des portions de l'interface correspondant à des composants spécifiques, sans avoir à interroger le serveur pour obtenir une nouvelle page. Lors de l'exécution des tâches, les utilisateurs doivent naviguer entre les différentes vues que vous avez définies.

Pour gérer cette navigation, vous utilisez le routeur Angular. Ce dernier permet la navigation en interprétant l'URL du navigateur comme une instruction de changement de vue.

### Le template binding
Le template binding crée une connexion dynamique entre le modèle d'un composant et ses données. Cette connexion garantit que les modifications apportées aux données du composant mettent automatiquement à jour le modèle rendu. Elle décrit notamment la liaison entre variables TypeScript et balises HTML (`{{ variable }}` ou `[attr]`, `(event)`).

Vous pouvez lier du texte dynamique dans les modèles à l'aide de doubles accolades, ce qui indique à Angular qu'il est responsable de l'expression à l'intérieur et de sa mise à jour correcte. C'est ce qu'on appelle l'interpolation de texte.

```bash
@Component({
  template: `
    <p>Your color preference is {{ theme }}.</p>
  `,
  ...
})
export class AppComponent {
  theme = 'dark';
}
```
In this example, when the snippet is rendered to the page, Angular will replace `{{ theme }}` with dark.

```bash
<!-- Rendered Output -->
<p>Your color preference is light.</p>
```

### Directive / Pipe
Les pipes sont un opérateur spécial des expressions de modèles Angular qui permet de manipuler et transformer du du DOM et des données de manière déclarative dans un modèle. Grâce aux pipes, une fonction de transformation est déclarée une seule fois, puis réutilisée dans plusieurs modèles. Les pipes Angular utilisent la barre verticale (|), inspirée du pipe Unix. (Ex : `*ngFor`, `date`).

```bash
import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [CurrencyPipe, DatePipe, TitleCasePipe],
  template: `
    <main>
       <!-- Transform the company name to title-case and
       transform the purchasedOn date to a locale-formatted string -->
<h1>Purchases from {{ company | titlecase }} on {{ purchasedOn | date }}</h1>
	    <!-- Transform the amount to a currency-formatted string -->
      <p>Total: {{ amount | currency }}</p>
    </main>
  `,
})
export class ShoppingCartComponent {
  amount = 123.45;
  company = 'acme corporation';
  purchasedOn = '2024-07-08';
}
```
Lors du rendu du composant par Angular, le format de date et la devise seront adaptés aux paramètres régionaux de l'utilisateur. Par exemple, si l'utilisateur se trouve aux États-Unis, le rendu sera le suivant :

```bash
<main>
  <h1>Purchases from Acme Corporation on Jul 8, 2024</h1>
  <p>Total: $123.45</p>
</main>
```

# Choix techniques

### CommonModule
Exporte toutes les directives et tous les pipes Angular de base, tels que `NgIf`, `NgForOf`, `DecimalPipe`, etc. Réexportés par `BrowserModule`, qui est automatiquement inclus dans le module racine `AppModule` lors de la création d'une nouvelle application avec la commande `new` de l'interface de ligne de commande.

### OnInit
`ngOnInit` est une méthode du cycle de vie d'un composant Angular. Elle est appelée une fois que tous les composants du composant ont été initialisés, c'est-à-dire que tous les data-bindings sont prêts. C'est le moment idéal pour effectuer des opérations de configuration sur le composant, comme par exemple récupérer des données à partir d'un service ou d'une API.

Voici comment utiliser  `ngOnInit` dans un composant Angular :

```bash
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mon-composant',
  template: `
    <!-- Mettez ici le template de votre composant -->
  `,
  standalone: true
})
export class MonComposantComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    // Mettre ici le code à exécuter lors de l'initialisation du composant
  }
}
```
Vous pouvez mettre toutes les opérations de configuration nécessaires dans la méthode `ngOnInit`. Elle sera appelée une seule fois lors de l'initialisation du composant.

### ComponentFixture
ComponentFixture est un banc d'essai permettant d'interagir avec le composant créé et son élément correspondant.

### TestBed
Il configure et initialise l'environnement pour les tests unitaires et fournit des méthodes pour créer des composants et des services dans ces tests. `TestBed` est l'API principale pour écrire des tests unitaires pour les applications et bibliothèques Angular.