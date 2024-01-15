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
  }

  // getIconContainerColor(quizTitle: string) {
  //   switch (quizTitle) {
  //     case 'HTML':
  //       return '#FFF1E9'
  //       break;

  //     case 'CSS':
  //       return '#E0FDEF'
  //       break

  //     case 'Javascript':
  //       return '#EBF0FF'

  //     case 'Accessibility':
  //       return '#F6E7FF'
  //       break;

  //     default:
  //       return '#F6E7FF'
  //       break;
  //   }
  // }
}
