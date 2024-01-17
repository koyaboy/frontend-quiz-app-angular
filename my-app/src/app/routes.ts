import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HtmlproblemsComponent } from './htmlproblems/htmlproblems.component';
import { QuizcompleteComponent } from './quizcomplete/quizcomplete.component';

import { QuizGuard } from './quiz.guard';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
    },
    {
        path: ':title/quizcomplete',
        component: QuizcompleteComponent,
        title: 'Quiz Completed',
    },
    {
        path: 'html',
        component: HtmlproblemsComponent,
        title: 'Html Questions',
        canActivate: [QuizGuard]
    },
];

export default routeConfig