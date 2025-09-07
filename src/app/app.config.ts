import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),  // Use provideRouter to enable routing in the app
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    )
  ]
};
