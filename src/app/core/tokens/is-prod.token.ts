// is-prod.token.ts : définition d’un token d’injection Angular qui représente mon flag prod/dev.
/*
  Je crée un token d’injection personnalisé (IS_PROD) pour pouvoir injecter un booléen
  indiquant si l’application tourne en mode production ou en mode développement.

  L’objectif : je centralise ce choix via l’injection de dépendances, au lieu d’importer `environment`
  dans tous mes services. Ainsi, des services comme LoggerService peuvent adapter leur comportement
  en fonction de l’environnement, tout en restant découplés de la façon dont la valeur est obtenue.

  - InjectionToken<boolean> : je précise que ce token est associé à une valeur de type boolean.
  - 'IS_PROD' : clé descriptive utile pour le debug et les messages d’erreur.

  En pratique, je fournis la valeur de ce token au moment du bootstrap (module ou standalone),
  via un provider du type : { provide: IS_PROD, useValue: true/false }.
*/

import { InjectionToken } from '@angular/core';

export const IS_PROD = new InjectionToken<boolean>('IS_PROD');