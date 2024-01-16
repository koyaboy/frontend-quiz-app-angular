import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HtmlproblemsComponent } from './htmlproblems/htmlproblems.component';
import { QuizcompleteComponent } from './quizcomplete/quizcomplete.component';

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
        path: 'html/:id',
        component: HtmlproblemsComponent,
        title: 'Html Questions',
    },
];

export default routeConfig