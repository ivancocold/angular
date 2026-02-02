import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { IS_PROD } from './core/tokens/is-prod.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // Nécessaire pour Angular Material (MatSnackBar, etc.)
    provideAnimations(),

    importProvidersFrom(FormsModule),

    // ✅ true en prod, false en dev
    { provide: IS_PROD, useValue: !isDevMode() },
  ],
};
