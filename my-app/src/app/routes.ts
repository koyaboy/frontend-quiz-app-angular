import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HtmlproblemsComponent } from './htmlproblems/htmlproblems.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
    },
    {
        path: 'html/:id',
        component: HtmlproblemsComponent,
        title: 'Html Questions',
    }
];

export default routeConfig