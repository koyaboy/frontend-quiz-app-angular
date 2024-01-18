import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { QuizService } from '../quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  @ViewChild('themeSwitcher') themeSwitcher!: ElementRef

  subscription!: Subscription
  route: ActivatedRoute = inject(ActivatedRoute)
  quizService: QuizService = inject(QuizService)
  quizTitle: string = ""

  constructor() {
  }

  ngOnInit(): void {
    this.subscription = this.quizService.selectedQuiz$
      .subscribe((quizType) => {
        this.quizTitle = quizType
      })
  }

  toggleTheme(): void {
    if (this.themeSwitcher.nativeElement.checked) {
      document.body.classList.add("dark-theme")
    }
    else {
      document.body.classList.remove("dark-theme")
    }

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
