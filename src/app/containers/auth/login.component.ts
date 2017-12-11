/**
 * Created by mikkri on 2017-04-20.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminService } from '../../shared/services/admin.service';

@Component({
    selector: 'my-login',
    template: `<div class="login">
        <h1>Mittbolån Admin</h1>
        <form role="form" (submit)="onSubmit(username.value, password.value)">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" #username class="form-control" id="username" placeholder="Username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" #password class="form-control" id="password" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary" id="login-button">Sign in</button>
        </form>
    </div>`,
    styles: [`
        :host {
            position: absolute;
            width: 100%;
            height:100%;
            left:0;
            top: 0;
            background-color: #fff !important;
        }
        .login {
            width: 400px;
            height: 300px;
            position: absolute;
            left: 50%;
            margin-left: -200px;
            top: 50%;
            margin-top: -175px;
        }
        .login h1 {
            text-align: center;
            text-transform: capitalize;
        }
    `]
})
export class LoginComponent implements OnInit {
    constructor(private router: Router, private adminService: AdminService) {}

    ngOnInit():any {
        if (this.adminService.isLoggedIn()) {
            this.router.navigate(['dashboard']).then(r => r);
        } else {
            this.adminService.logout();
        }
    }

    onSubmit(email, password) {
        this.adminService.login(email, password).subscribe((result) => {
            if (result) {
                this.router.navigate(['dashboard']).then(r => r);
            }
        });
    }
}