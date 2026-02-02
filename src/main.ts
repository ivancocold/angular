import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { importProvidersFrom, isDevMode } from '@angular/core'; // ✅ isDevMode ici
import { FormsModule } from '@angular/forms';

import { IS_PROD } from './app/core/tokens/is-prod.token';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),

    // ✅ true en prod, false en dev
    { provide: IS_PROD, useValue: !isDevMode() },

    importProvidersFrom(FormsModule),
  ],
}).catch(err => console.error(err));