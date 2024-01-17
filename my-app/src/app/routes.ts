import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizcompleteComponent } from './quizcomplete/quizcomplete.component';

import { QuizComponent } from './quiz/quiz.component';

import { QuizGuard } from './quiz.guard';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
    },
    {
        path: ':title',
        component: QuizComponent,
        title: 'Quiz Questions',
        canActivate: [QuizGuard]
    },
    {
        path: ':title/quizcomplete',
        component: QuizcompleteComponent,
        title: 'Quiz Completed',
        canActivate: [QuizGuard]
    },
];

export default routeConfig