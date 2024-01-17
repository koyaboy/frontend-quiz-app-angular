import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quizcomplete',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quizcomplete.component.html',
  styleUrl: './quizcomplete.component.css'
})
export class QuizcompleteComponent {
  route: ActivatedRoute = inject(ActivatedRoute)

  quizTitle: string = ""
  quizService: QuizService = inject(QuizService)
  finalScore!: number

  constructor() {
    this.quizTitle = this.quizService.getQuizType()
    this.finalScore = this.quizService.getScore()
  }

  ngOnDestroy() {
    this.quizService.setScore(0)
  }
}
