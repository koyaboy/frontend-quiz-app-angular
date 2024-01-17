// quiz.guard.ts

import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { QuizService } from './quiz.service';

@Injectable({
  providedIn: 'root',
})

export class QuizGuard {

  quizService: QuizService = inject(QuizService)
  router: Router = inject(Router)

  constructor() { }

  canActivate(): boolean {
    if (this.quizService.selectedQuizType !== '') {
      return true;
    } else {
      this.router.navigate(["/"])
      return false
    }
  }
}
