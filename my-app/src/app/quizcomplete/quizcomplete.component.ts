import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quizcomplete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizcomplete.component.html',
  styleUrl: './quizcomplete.component.css'
})
export class QuizcompleteComponent {
  route: ActivatedRoute = inject(ActivatedRoute)

  quizTitle: string = ""
  quizService: QuizService = inject(QuizService)

  constructor() {
    this.quizTitle = this.quizService.getQuizType()
  }
}
