/**
 * Created by mikkri on 2017-05-15.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
//import { DashboardService } from '../../shared/services/dashboard.service';

@NgModule({
    imports: [CommonModule],
    declarations: [DashboardComponent],
    exports: [DashboardComponent],
    providers: [] //DashboardService
})
export class DashboardModule { }