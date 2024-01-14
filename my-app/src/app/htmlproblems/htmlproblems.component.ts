import { Component, inject } from '@angular/core';
import { QuizService } from '../quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Quiz, Question } from '../quiz';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-htmlproblems',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './htmlproblems.component.html',
  styleUrl: './htmlproblems.component.css'
})

export class HtmlproblemsComponent {
  quizService: QuizService = inject(QuizService)
  route: ActivatedRoute = inject(ActivatedRoute)
  quizzes: Quiz[] = []
  htmlProblems: Question[] = []
  problemIndex: number = 0
  questions: [] = []
  selectedOptionIndex: number = -1;

  constructor() {
    this.quizzes = this.quizService.getQuizzes()

    this.htmlProblems = this.quizzes.filter((quiz) => quiz.title == "HTML")[0].questions

    this.problemIndex = Number(this.route.snapshot.params['id']) - 1;

    console.log(this.htmlProblems)
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  pickOption(index: number) {
    this.selectedOptionIndex = index
  }


}
