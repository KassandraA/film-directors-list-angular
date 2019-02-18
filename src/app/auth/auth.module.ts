import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SigninComponent } from './signin/signin.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [
        SigninComponent,
        RegistrationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule
    ],
    exports: []
})

export class AuthModule {}
