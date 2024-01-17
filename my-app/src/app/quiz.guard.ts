// quiz.guard.ts

import { Injectable, inject, PLATFORM_ID, Inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { QuizService } from './quiz.service';
import { isPlatformBrowser } from '@angular/common';
import { platform } from 'os';

@Injectable({
  providedIn: 'root',
})

export class QuizGuard {

  quizService: QuizService = inject(QuizService)
  router: Router = inject(Router)

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  canActivate(): boolean | UrlTree {
    if (isPlatformBrowser(this.platformId)) {
      if (this.quizService.selectedQuizType !== '') {
        return true;
      } else {
        return this.router.parseUrl("/");
      }
    } else {
      // Implicit return for server-side (if applicable)
      return false
    }
  }

}
