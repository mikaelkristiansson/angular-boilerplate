/**
 * Created by mikkri on 2017-04-20.
 */

import {Component} from '@angular/core';

//import '../style/main.scss';

@Component({
    selector: 'my-app',
    template: `
        <div class="app">
            <div class="app-content">
                <router-outlet></router-outlet>
            </div>
        </div>
    `
})

export class AppComponent {
    constructor() {}
}