import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test';
  themeService: ThemeService = inject(ThemeService)

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  ngOnInit() {
    this.themeService.theme.subscribe((themeValue) => {
      if (isPlatformBrowser(this.platformId)) {
        if (themeValue == "dark-theme") {
          document.body.classList.add("dark-theme")
          document.body.classList?.remove("light-theme")
        } else {
          document.body.classList.add("light-theme")
          document.body.classList?.remove("dark-theme")
        }
      }
    });
  }
}