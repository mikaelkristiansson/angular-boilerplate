/**
 * Created by mikkri on 2017-05-14.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private user: AdminService, private router: Router) {}

    canActivate() {
        console.log(this.user.isLoggedIn());
        if (this.user.isLoggedIn()) {
            return this.user.isLoggedIn();
        } else {
            // If not, they redirect them to the login page
            this.router.navigate(['/login']).then(() => {
                return this.user.isLoggedIn();
            });
        }
        //return this.user.isLoggedIn();
    }
}