/**
 * Created by mikkri on 2017-05-14.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Config } from '../config/env.config';
import 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable()
export class AdminService {
    private loggedIn = false;
    public API: any;

    constructor(private http: Http, private router: Router) {
        this.loggedIn = !!localStorage.getItem('auth_token');
    }

    login(email, password) {
        let auth = btoa(`${email}:${password}`);
        let headers = new Headers();
        headers.append('Authorization', `Basic ${auth}`);
        return this.http.post(Config.API+'/login', {}, {headers})
            //.map(res => res.json())
            .map((res) => {
                let payload = res.json();
                let header = res.headers;

                let setCookieHeader = header.get('Set-Cookie');
                console.log(res, header, setCookieHeader);
                if (payload) {
                    console.log(payload);
                    localStorage.setItem('auth_token', auth);
                    localStorage.setItem('jwt_token', payload.jwtToken);
                    delete payload.jwtToken;
                    localStorage.setItem('Me', JSON.stringify(payload));
                    //let expires_at = ((Date.now() / 1000 | 0) + res.expires_in);
                    //localStorage.setItem('expires_at', expires_at);
                    this.loggedIn = true;
                }
                return res;
            });
    }

    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('Me');
        this.loggedIn = false;
        this.router.navigate(['/login']).then();
    }

    isLoggedIn() {
        return this.loggedIn;
    }

}