/*
  header.component.ts

  Ici, je définis le composant Angular responsable de l’en-tête (header) de mon application.
  Ce composant affiche principalement le logo et la navigation (liens vers mes pages).
  Comme je n’ai pas de logique métier particulière pour l’instant, ma classe reste vide.
*/

import { Component } from '@angular/core';

/*
  Je vais utiliser le Router dans mon template HTML :
  - RouterLink : pour naviguer vers une route sans recharger la page (SPA).
  - RouterLinkActive : pour appliquer automatiquement une classe CSS quand le lien correspond à la route active.
*/
import { RouterLink, RouterLinkActive } from '@angular/router';

/*
  NgOptimizedImage : je l’utilise pour optimiser le chargement des images (directive ngSrc).
  Cela améliore généralement les performances et la stabilité de mise en page.
*/
import { NgOptimizedImage } from '@angular/common';

@Component({
  /*
    selector : je définis le nom de la balise HTML que j’utilise pour intégrer ce header
    dans mes templates (ex : <app-header></app-header>).
  */
  selector: 'app-header',

  /*
    standalone: true :
    je déclare ce composant comme “standalone”, ce qui signifie que je n’ai pas besoin
    de le déclarer dans un NgModule. Je gère directement ses dépendances via `imports`.
  */
  standalone: true,

  /*
    templateUrl : je lie le fichier HTML qui contient la structure du header
    (logo + navigation).
  */
  templateUrl: './header.component.html',

  /*
    imports :
    comme mon composant est standalone, je liste ici toutes les directives/pipes
    dont j’ai besoin dans le template.
    - RouterLink / RouterLinkActive : pour la navigation et l’état actif des liens.
    - NgOptimizedImage : pour utiliser ngSrc et optimiser les images.
  */
  imports: [RouterLinkActive, RouterLink, NgOptimizedImage],

  /*
    styleUrls : je lie la feuille de style SCSS associée au header.
  */
  styleUrls: ['./header.component.scss']
})
/*
  Classe du composant :
  - Elle est vide pour l’instant car mon header ne dépend d’aucune donnée dynamique.
  - Si je veux plus tard ajouter un état (ex : user connecté, compteur panier, etc.),
    je le ferai ici.
*/
export class HeaderComponent {}