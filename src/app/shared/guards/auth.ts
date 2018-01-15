import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService} from "../services/auth";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private auth: AuthService
    ) { }

    canActivate() {
        if (this.auth.isAuth() && this.auth.getUser().role === 'admin') {
            return true;
        }

        this.router.navigate(['/']);
        return false;
    }
}