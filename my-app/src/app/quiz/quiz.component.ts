import { Component, inject, ViewChildren, ElementRef, QueryList, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { QuizService } from '../quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz, Question } from '../quiz';
import { CommonModule, isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  @ViewChildren('optionButton') optionButtons!: QueryList<ElementRef>;
  @ViewChild('nextButton') nextButton!: ElementRef;
  @ViewChild('submitButton') submitButton!: ElementRef;
  @ViewChild('noAnswer') noAnswer!: ElementRef

  quizService: QuizService = inject(QuizService)
  route: ActivatedRoute = inject(ActivatedRoute)
  router: Router = inject(Router)

  quizzes: Quiz[] = []
  quizProblems: Question[] = []
  problemIndex: number = 0
  selectedOptionIndex: number = -1;
  score: number = 0

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.quizzes = this.quizService.getQuizzes()
    this.quizProblems = this.quizzes.filter((quiz) => quiz.title == this.quizService.selectedQuizType)[0].questions

    if (isPlatformBrowser(this.platformId)) {
      this.quizService.setQuizType(localStorage.getItem("selectedQuizType") || "")
    }
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
    let options = this.quizProblems[this.problemIndex].options
    let answer = this.quizProblems[this.problemIndex].answer
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
          this.score++
        }
        else if (this.selectedOptionIndex === index) {
          button.nativeElement.style.border = "3px solid var(--red)"
          button.nativeElement.classList.add('selectedWrongAnswer');
        }
        else if (index === answerIndex) {
          button.nativeElement.classList.add('correctAnswer')
        }

        button.nativeElement.disabled = true;
      });

      submitButton.style.display = "none"
      this.nextButton.nativeElement.style.display = "block"
    }
  }

  moveToNextQuestion() {
    this.problemIndex = this.problemIndex + 1
    if (this.problemIndex == 10) {
      this.quizService.setScore(this.score)
      this.router.navigate([this.quizService.selectedQuizType, 'quizcomplete'])
    }

    this.resetComponent()
  }

  resetComponent() {
    this.selectedOptionIndex = -1

    this.optionButtons.forEach((button) => {
      button.nativeElement.style.border = "none"
    })

    this.submitButton.nativeElement.style.display = "block"
    this.nextButton.nativeElement.style.display = "none"
  }
}
