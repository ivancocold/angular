// @ts-check
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import angular from "angular-eslint";

/**
 * Niveaux:
 * 1 = Base (no-console + selectors + peu de bruit)
 * 2 = TS propre (no-explicit-any)
 * 3 = + Accessibilité templates + stylistic TS
 * 4 = Angular moderne (prefer-inject + prefer-control-flow + lifecycle interface)
 * 5 = Très strict (ts strict)
 */
const LEVEL = 1;

const tsExtends = [
  eslint.configs.recommended,
  tseslint.configs.recommended,
  angular.configs.tsRecommended,
  ...(LEVEL >= 3 ? [tseslint.configs.stylistic] : []),
  ...(LEVEL >= 5 ? [tseslint.configs.strict] : []),
];

const htmlExtends = [
  angular.configs.templateRecommended,
  ...(LEVEL >= 3 ? [angular.configs.templateAccessibility] : []),
];

export default defineConfig([
  {
    files: ["**/*.ts"],
    extends: tsExtends,
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        { type: "attribute", prefix: "app", style: "camelCase" },
      ],
      "@angular-eslint/component-selector": [
        "error",
        { type: "element", prefix: "app", style: "kebab-case" },
      ],

      // Objectif principal: interdire console.log partout (sauf exception logger)
      "no-console": ["error", { allow: ["warn", "error"] }],

      // Niveau 2+
      ...(LEVEL >= 2 ? { "@typescript-eslint/no-explicit-any": "error" } : {}),

      // Niveau 4+ (Angular moderne)
      ...(LEVEL >= 4
        ? {
            "@angular-eslint/prefer-inject": "error",
            "@angular-eslint/use-lifecycle-interface": "error",
          }
        : {
            "@angular-eslint/prefer-inject": "off",
            // tu peux laisser en warn dès le début si tu veux
            "@angular-eslint/use-lifecycle-interface": "off",
          }),
    },
  },

  {
    files: ["**/*.html"],
    extends: htmlExtends,
    rules: {
      // Niveau 4+ : pousse vers @if/@for (sinon on laisse tranquille)
      "@angular-eslint/template/prefer-control-flow": LEVEL >= 4 ? "error" : "off",
    },
  },

  // Exception pour le service logger: lui a le droit d'utiliser console.*
  {
    files: ["src/app/core/services/logger.service.ts"],
    rules: {
      "no-console": "off",
    },
  },
]);
