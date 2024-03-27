import { ApplicationConfig } from '@angular/core';
import { provideRouter, withRouterConfig, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withRouterConfig({
        'onSameUrlNavigation': 'reload'
      }),
      withHashLocation()
    ),
    provideHttpClient(
      withFetch(),
      // withInterceptors(),
    )
  ]
};
