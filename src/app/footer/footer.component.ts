/* footer.component.ts */

/*
  Ici, je définis le composant Angular responsable de l’affichage du footer (pied de page).
  Ce composant sert principalement de “conteneur” : sa vue (HTML) et son style (SCSS)
  portent l’essentiel du contenu, tandis que la classe TypeScript peut rester vide
  tant que je n’ai pas besoin de logique particulière.
*/

import { Component } from '@angular/core';

@Component({
  /*
    selector : je définis le nom de la balise HTML que j’utilise pour insérer ce composant
    dans mes templates (ex : <app-footer></app-footer>).
  */
  selector: 'app-footer',

  /*
    templateUrl : je lie le template HTML associé à ce composant.
    Tout ce qui est affiché dans le footer se trouve dans footer.component.html.
  */
  templateUrl: './footer.component.html',

  /*
    styleUrls : je lie la/les feuille(s) de style spécifiques au composant.
    Ici, j’utilise footer.component.scss pour appliquer le style du pied de page.
  */
  styleUrls: ['./footer.component.scss']
})
/*
  Classe du composant :
  - Pour l’instant je n’ai pas de propriétés ni de méthodes car mon footer est statique.
  - Si j’ajoute plus tard des informations dynamiques (année courante, liens, état utilisateur, etc.),
    je le ferai ici.
*/
export class FooterComponent {}