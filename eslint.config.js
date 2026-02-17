/* eslint.config.js */

/*
  Configuration ESLint du projet (format “flat config”).
  Je m’en sers pour :
  - appliquer des règles de qualité de code TypeScript,
  - appliquer les bonnes pratiques Angular,
  - linter mes templates HTML,
  - garder une politique claire sur l’usage de console (interdit partout sauf LoggerService).
*/

// @ts-check
// J’active le type-checking JS de TypeScript sur ce fichier (utile pour éviter des erreurs de config).
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import angular from "angular-eslint";

/**
  Niveaux:
  * 1 = Base (no-console + selectors + peu de bruit)
  * 2 = TS propre (no-explicit-any)
  * 3 = + Accessibilité templates + stylistic TS
  * 4 = Angular moderne (prefer-inject + prefer-control-flow + lifecycle interface)
  * 5 = Très strict (ts strict)
  
  Je contrôle la “sévérité” globale de mon lint grâce à LEVEL : plus niveau souhaité est grand, plus j’active de règles strictes.
 */
const LEVEL = 1;

/*
  Ici, je construis la liste des configs ESLint à étendre pour mes fichiers TypeScript.
  - Je pars des recommandations de base ESLint
  - Puis j’ajoute celles de TypeScript (typescript-eslint)
  - Puis celles d’Angular (angular-eslint)
  - Et selon mon LEVEL, j’ajoute du style (LEVEL >= 3) et du strict TS (LEVEL >= 5)
*/
const tsExtends = [
  eslint.configs.recommended,
  tseslint.configs.recommended,
  angular.configs.tsRecommended,
  ...(LEVEL >= 3 ? [tseslint.configs.stylistic] : []),
  ...(LEVEL >= 5 ? [tseslint.configs.strict] : []),
];

/*
  Même logique que tsExtends, mais pour mes templates HTML :
  - règles Angular recommandées pour templates
  - et si LEVEL >= 3, j’ajoute les règles d’accessibilité (a11y)
*/
const htmlExtends = [
  angular.configs.templateRecommended,
  ...(LEVEL >= 3 ? [angular.configs.templateAccessibility] : []),
];

/*
  J’exporte ma configuration ESLint (defineConfig) sous forme d’un tableau de “blocs”.
  Chaque bloc cible un type de fichiers (TS, HTML, exception, etc.).
*/
export default defineConfig([
  /*
    Bloc 1 : règles pour tous les fichiers TypeScript (*.ts)
  */
  {
    files: ["**/*.ts"],

    // J’applique toutes les configs choisies plus haut.
    extends: tsExtends,

    /*
      Angular peut contenir des templates inline dans les composants.
      Avec ce processor, je demande à ESLint d’analyser aussi le HTML inline présent dans les fichiers TS.
    */
    processor: angular.processInlineTemplates,

    rules: {
      /*
        Je force une convention de nommage pour les sélecteurs Angular :
        - directives : en attribut (ex : <div appMaDirective>) et en camelCase
        - composants : en élément (ex : <app-mon-composant>) et en kebab-case
        Ça évite les incohérences et c’est un standard Angular.
      */
      "@angular-eslint/directive-selector": [
        "error",
        { type: "attribute", prefix: "app", style: "camelCase" },
      ],
      "@angular-eslint/component-selector": [
        "error",
        { type: "element", prefix: "app", style: "kebab-case" },
      ],

      // Objectif principal: interdire console.log partout (sauf exception logger)
      // Je permets console.warn et console.error car ils sont utiles même en prod pour diagnostiquer.
      "no-console": ["error", { allow: ["warn", "error"] }],

      // Niveau 2+
      // Si je monte LEVEL à 2 ou plus, j’interdis explicitement `any` pour garder un TS plus propre.
      ...(LEVEL >= 2 ? { "@typescript-eslint/no-explicit-any": "error" } : {}),

      // Niveau 4+ (Angular moderne)
      ...(LEVEL >= 4
        ? {
            /*
              À partir du niveau 4, je pousse des pratiques Angular plus modernes :
              - prefer-inject : préfère l’injection via inject() (plutôt que le constructor) quand pertinent
              - use-lifecycle-interface : force l’implémentation des interfaces (OnInit, OnDestroy, etc.)
                pour rendre l’usage des hooks plus explicite.
            */
            "@angular-eslint/prefer-inject": "error",
            "@angular-eslint/use-lifecycle-interface": "error",
          }
        : {
            /*
              Sinon, je désactive ces règles :
              - prefer-inject off : je laisse les constructors classiques (plus simple au début)
              - lifecycle interface off : je pourrais mettre warn, mais ça crée du bruit pour les débutants
            */
            "@angular-eslint/prefer-inject": "off",
            // Je peux laisser en warn dès le début, mais ça fait du bruit pour les débutants, donc je laisse en off
            "@angular-eslint/use-lifecycle-interface": "off",
          }),
    },
  },

  /*
    Bloc 2 : règles pour tous les fichiers de template Angular (*.html)
  */
  {
    files: ["**/*.html"],
    extends: htmlExtends,
    rules: {
      /*
        Niveau 4+ : pousse vers @if/@for (control flow syntax Angular récente)
        Si je suis en dessous, je ne force rien pour éviter de casser un code existant
        basé sur *ngIf / *ngFor.
      */
      "@angular-eslint/template/prefer-control-flow": LEVEL >= 4 ? "error" : "off",
    },
  },

  /*
    Bloc 3 : exception pour le service logger
    Je veux centraliser tous les console.* dans LoggerService, donc je lui autorise console.
  */
  // Exception pour le service logger: lui a le droit d'utiliser console.*
  {
    files: ["src/app/core/services/logger.service.ts"],
    rules: {
      "no-console": "off",
    },
  },
]);