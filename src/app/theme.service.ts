// theme.service.ts
import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>(this.loadThemeState());
  theme = this.themeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  loadThemeState(): string {
    let storedTheme = ""
    if (isPlatformBrowser(this.platformId)) {
      storedTheme = localStorage.getItem("theme") || "light-theme";
    }
    return storedTheme
  }

  private saveThemeState(newTheme: string): void {
    if (isPlatformBrowser(this.platformId)) localStorage.setItem("theme", newTheme);
  }

  toggleDarkMode(): void {
    let newTheme = ""
    if (this.themeSubject.value == "light-theme") {
      newTheme = "dark-theme"
    }
    else {
      newTheme = "light-theme"
    }
    this.themeSubject.next(newTheme)
    this.saveThemeState(newTheme)
  }
}
