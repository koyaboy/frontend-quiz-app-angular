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

    const urlSegments = this.route.snapshot.url
    if (urlSegments.length > 0) {
      this.quizTitle = urlSegments[0].path
      console.log(this.quizTitle)
    }

  }
}
