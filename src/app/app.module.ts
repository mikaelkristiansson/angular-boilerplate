/**
 * Created by mikkri on 2017-04-20.
 */
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

//APP
import { AppComponent } from './app.component';
import { DashboardModule } from './containers/dashboard/dashboard.module';
import { RoutesComponent } from './app.routes';

//SERVICES
import { NotificationService } from './shared/services/notification.service';

//HMR
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        DashboardModule,
        RoutesComponent
    ],
    declarations: [ //COMPONENTS
        AppComponent
    ],
    providers: [ //SERVICES
        NotificationService,
        {provide: APP_BASE_HREF, useValue : '/' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) {}
    hmrOnInit(store) {
        console.log('HMR store', store);
    }
    hmrOnDestroy(store) {
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }
    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}