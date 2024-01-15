import { Component, inject, ViewChildren, ElementRef, QueryList, ViewChild } from '@angular/core';
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
  @ViewChildren('optionButton') optionButtons!: QueryList<ElementRef>;
  @ViewChild('nextButton') nextButton!: ElementRef;
  @ViewChild('noAnswer') noAnswer!: ElementRef

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
    this.noAnswer.nativeElement.classList?.remove("active")
  }

  submitAnswer(event: MouseEvent) {
    let submitButton = event.target as HTMLElement
    let options = this.htmlProblems[this.problemIndex].options
    let answer = this.htmlProblems[this.problemIndex].answer
    let answerIndex = -1

    for (let i = 0; i < options.length; i++) {
      if (options[i] == answer) answerIndex = i
    }

    if (this.selectedOptionIndex == -1) {
      this.noAnswer.nativeElement.classList.add("active")
    }

    else {
      this.optionButtons.forEach((button, index) => {
        if (index === answerIndex && this.selectedOptionIndex === answerIndex) {
          button.nativeElement.style.border = "3px solid var(--green)"
          button.nativeElement.classList.add('selectedCorrectAnswer');
        }
        else if (this.selectedOptionIndex === index) {
          button.nativeElement.style.border = "3px solid var(--red)"
          button.nativeElement.classList.add('selectedWrongAnswer');
        }
        button.nativeElement.disabled = true;
      });

      submitButton.style.display = "none"
      this.nextButton.nativeElement.style.display = "block"
    }
  }


}
