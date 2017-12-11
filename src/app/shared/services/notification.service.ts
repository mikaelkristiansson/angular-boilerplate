/**
 * Created by mikkri on 2017-05-15.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../config/env.config';
import { HeaderService } from '../helpers/header.service';
import 'rxjs/Rx';

@Injectable()
export class NotificationService {
    private headers: any;
    constructor(public http: Http) {
        this.headers = HeaderService.setHeader();
    }

    getNotifications(read:boolean) {
        // return an observable
        return this.http.get(`${Config.API}/notification?read=${read}`, {
            headers: this.headers
        })
            .map( response => {
                return response.json();
            });
    }
}