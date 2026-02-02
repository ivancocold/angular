// @ts-check
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import angular from "angular-eslint";

export default defineConfig([
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: 
    {
      "@angular-eslint/directive-selector": 
      [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": 
      [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],

      'no-console':
      [
        'error', { allow: ['warn', 'error'] }
      ],
      
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
    rules: 
    {
      "@angular-eslint/template/prefer-control-flow": "off",
    },
  },
  // exception pour le service logger
  {
  files: ["src/app/core/services/logger.service.ts"],
  rules: {
    "no-console": "off",
  },
},

]);
