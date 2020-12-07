/**
 * Title: base-layout.component.ts
 * Author: Professor Krasso
 * Date: 5th December 2020
 * Modified By: King Major
 * Description: Base layout component
 */
import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {
  year: number = Date.now();
  isLoggedIn: string;
  constructor(private cookieService: CookieService, private router: Router) {
    this.isLoggedIn = this.cookieService.get('session_user');
  }
  ngOnInit() { }
  signout() {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']);
  }
}
