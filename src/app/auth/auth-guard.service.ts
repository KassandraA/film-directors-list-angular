import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private authService: AuthService) {}

    canActivate() {
        return this.authService.isAuthenticated();
    }
}
