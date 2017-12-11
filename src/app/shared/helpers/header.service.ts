/**
 * Created by mikkri on 2017-05-14.
 */
import {Headers} from '@angular/http';

export class HeaderService {
    static setHeader() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //let authToken = localStorage.getItem('auth_token');
        //headers.append('Authorization', `Basic ${authToken}`);
        let jwtToken = localStorage.getItem('jwt_token');
        headers.append('Authorization', `Bearer ${jwtToken}`);
        return headers;
    }

    setSessionId(url) {
        let sessionId = null;
        let value = "; " + document.cookie;
        let parts = value.split("; PHPSESSID=");

        if (parts.length == 2) {
            sessionId = parts.pop().split(";").shift();
        }

        if(sessionId !== null) {
            url += "&sId="+sessionId;
        }

        //config.withCredentials = true;
        return url;
    }
}