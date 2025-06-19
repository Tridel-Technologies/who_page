import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandComponent } from './home/land/land.component';

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
        path:'land',
        component:LandComponent
    },
];
