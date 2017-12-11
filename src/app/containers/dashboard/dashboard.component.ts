/**
 * Created by mikkri on 2017-05-15.
 */
import {Component} from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
//import { DashboardService } from '../../shared/services/dashboard.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
    //dashboard: any;

    constructor(private notificationService: NotificationService) { //dashboardService: DashboardService
        notificationService.getNotifications(true)
            .subscribe(res => console.log(res));
        /*dashboardService.getDashboard()
            .subscribe(res => this.dashboard = res);*/
    }
}