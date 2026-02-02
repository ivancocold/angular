import { Inject, Injectable } from '@angular/core';
import { IS_PROD } from '../tokens/is-prod.token';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  constructor(@Inject(IS_PROD) private readonly isProd: boolean) {}

  /** Logs DEV uniquement */
  debug(...args: unknown[]): void {
    if (!this.isProd) console.log(...args);
  }

  /** Logs DEV uniquement (optionnel) */
  info(...args: unknown[]): void {
    if (!this.isProd) console.info(...args);
  }

  /** On garde warn/error même en prod (souvent utile) */
  warn(...args: unknown[]): void {
    console.warn(...args);
  }

  error(...args: unknown[]): void {
    console.error(...args);
  }
}
