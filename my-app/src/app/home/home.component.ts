import { Component, inject, OnInit } from '@angular/core';
import { Quiz } from '../quiz';

import { QuizService } from '../quiz.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  quizService: QuizService = inject(QuizService)
  quizzes: Quiz[] = []

  constructor() {
    this.quizzes = this.quizService.getQuizzes();
    this.quizService.setQuizType("")
  }
}
