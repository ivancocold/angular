//logger.service.ts : service de logging, qui injecte une variable d’environnement pour différencier DEV/PROD, et qui propose des méthodes de log adaptées.
/*
  Je m’en sers pour centraliser les logs de l’application.
  J’injecte un booléen (IS_PROD) qui me dit si je tourne en production ou non,
  afin d’adapter le niveau de logs (ex : couper debug/info en PROD).
*/
import { Inject, Injectable } from '@angular/core';
import { IS_PROD } from '../tokens/is-prod.token';

/*
Token d’injection personnalisé : je l’utilise pour récupérer une "variable d’environnement"
(un booléen) indiquant si l’app est en production.
*/
@Injectable({ providedIn: 'root' })
export class LoggerService
{
    /*
    Le constructeur est appelé quand Angular instancie le service via l’injection de dépendances.
    Ici, je demande à Angular de m’injecter la valeur associée au token IS_PROD.

    - @Inject(IS_PROD) : je précise explicitement quel token je veux injecter.
    - private readonly isProd: boolean : je stocke cette info dans un attribut privé immuable,
      afin de pouvoir conditionner mes logs dans le reste du service.
  */
  constructor(@Inject(IS_PROD) private readonly isProd: boolean) {}

    /*
    debug(...args)
    Je l’utilise pour afficher des logs de debug pendant le développement uniquement.
    - ...args: unknown[] : j’accepte n’importe quel type d’argument (strings, objets, etc.)
      et je les passe directement à console.log.
    - Si je suis en production (isProd === true), je ne log rien pour éviter le bruit
      et les éventuelles fuites d’infos.
  */

  /** Logs DEV uniquement */
  debug(...args: unknown[]): void
  {
    if (!this.isProd) console.log(...args);
  }

    /*
    info(...args)
    Je l’utilise pour des informations générales (moins "bruit" que debug), toujours en DEV uniquement.
    - En PROD, je coupe également ces logs pour garder la console propre.
    - J’emploie console.info pour distinguer le niveau "info" dans les outils de dev.
  */

  /** Logs DEV uniquement (optionnel) */
  info(...args: unknown[]): void 
  {
    if (!this.isProd) console.info(...args);
  }

    /*
    warn(...args)
    Je l’utilise pour signaler des situations anormales mais non bloquantes.
    - Contrairement à debug/info, je garde warn même en production,
      car ces messages peuvent aider à diagnostiquer des comportements inattendus chez les utilisateurs.
  */

  /** Je garde warn/error même en prod */
  warn(...args: unknown[]): void
  {
    console.warn(...args);
  }

    /*
    error(...args)
    Je l’utilise pour journaliser des erreurs (exceptions, échecs d’appels API, etc.).
    - Je garde error en production, car c’est critique pour le diagnostic.
    - Je passe tous les arguments à console.error pour profiter de l’affichage dédié aux erreurs.
  */
  error(...args: unknown[]): void
  {
    console.error(...args);
  }
}
