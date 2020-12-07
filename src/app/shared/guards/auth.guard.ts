/**
 * Title: auth.guard.ts
 * Author: Professor Krasso
 * Date: 5th December 2020
 * Modified By: King Major
 * Description: Guard for authenticated users
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const sessionUser = this.cookieService.get('session_user')

    //If the cookie is present allow the user to access the application.
    if (sessionUser) {
      return true;
    } else {
      //Otherwise, the user is not signed into the system and should be redirected to the sign-in component.
      this.router.navigate(['/session/signin'])
      return false
    }
  }
}

