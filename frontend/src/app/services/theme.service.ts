import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {
    const isDark = localStorage.getItem('darkMode') === 'true';
    this.setDarkMode(isDark);
  }

  toggleTheme(): void {
    const isDark = !this.darkModeSubject.value;
    this.setDarkMode(isDark);
  }

  private setDarkMode(isDark: boolean): void {
    this.darkModeSubject.next(isDark);
    const body = this.document.body;

    if (isDark) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }

    localStorage.setItem('darkMode', String(isDark));
  }
}
