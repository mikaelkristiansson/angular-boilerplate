import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { AdminService } from '../../shared/services/admin.service';
import { LoggedInGuard } from '../../shared/helpers/logged-in.guard';
// import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [LoginComponent, LogoutComponent],
    exports: [LoginComponent, LogoutComponent],
    providers: [AdminService, LoggedInGuard]
})
export class AuthModule { }