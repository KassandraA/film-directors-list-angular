import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { RegistrationComponent } from './registration/registration.component';

const authRoutes: Routes = [
    { path: 'signin', component: SigninComponent },
    { path: 'registration', component: RegistrationComponent }
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)]
})

export class AuthRoutingModule {}
