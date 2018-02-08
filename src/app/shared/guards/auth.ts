import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";

import {AuthService} from "itpm-shared";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private AuthService: AuthService) {
  }

  canActivate() {
    if (this.AuthService.isAuth() && this.AuthService.getUser().role === 'admin') {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}