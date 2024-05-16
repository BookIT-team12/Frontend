// recaptcha-loader.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaLoaderService {
  private scriptLoaded = false;

  loadScript(): Promise<void> {
    if (!this.scriptLoaded) {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          this.scriptLoaded = true;
          resolve();
        };
        script.onerror = (error) => {
          reject(error);
        };
        document.head.appendChild(script);
      });
    } else {
      return Promise.resolve();
    }
  }
}
