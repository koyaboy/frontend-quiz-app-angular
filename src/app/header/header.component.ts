import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ViewChild, ElementRef, Inject, inject, TransferState, makeStateKey, PLATFORM_ID } from '@angular/core';
import { QuizService } from '../quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('themeSwitcher') themeSwitcher!: ElementRef;

  subscription!: Subscription;
  route: ActivatedRoute = inject(ActivatedRoute);
  quizService: QuizService = inject(QuizService);
  quizTitle: string = '';
  theme: string = '';
  themeService: ThemeService = inject(ThemeService)

  constructor(@Inject(PLATFORM_ID) private platformID: object) { }

  ngOnInit(): void {
    this.subscription = this.quizService.selectedQuiz$
      .subscribe((quizType) => {
        this.quizTitle = quizType
      })
  }

  ngAfterViewInit(): void {
    if (this.themeService.loadThemeState() == "dark-theme") {
      this.themeSwitcher.nativeElement.checked = true
    } else {
      this.themeSwitcher.nativeElement.checked = false
    }
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
