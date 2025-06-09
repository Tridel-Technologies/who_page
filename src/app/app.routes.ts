import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo:'base'
    },
    {
        path:'base',
        component:HomeComponent
    },
    {
        path:'about',
        component:AboutComponent
    }
];
