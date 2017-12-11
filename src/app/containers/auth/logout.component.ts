/**
 * Created by mikkri on 2017-05-15.
 */
import { Component } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';

@Component({
    selector: 'my-logout',
    template: ``,
    styles: [``]
})

export class LogoutComponent {
    constructor(private adminService: AdminService) {
        this.adminService.logout();
    }
}