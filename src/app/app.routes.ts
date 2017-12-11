/**
 * Created by mikkri on 2017-04-20.
 */
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './containers/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent, pathMatch: 'full' },
    { path: '**', redirectTo: '/dashboard' }
];

export const RoutesComponent = RouterModule.forRoot(routes, { useHash: false });