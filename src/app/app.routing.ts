/**
 * Title: app.routing.ts
 * Author: Professor Krasso
 * Date: 5 March 2020
 * Description: Routing for all components
 */
​
import {Routes} from '@angular/router';
import {BaseLayoutComponent} from './shared/base-layout/base-layout.component';
import {HomeComponent} from './pages/home/home.component';
import {AuthLayoutComponent} from './shared/auth-layout/auth-layout.component';
import {SigninComponent} from './pages/signin/signin.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {AboutComponent} from './pages/about/about.component'
import {NotFoundComponent} from './pages/not-found/not-found.component'
​
export const AppRoutes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard] // Use's must be signed-in to access the application
      },
      {
        // Routes authenticated user to the about component view
        path: 'about',
        component: AboutComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    // directs users to the signin page for authentication
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        // Routes any user to the not-found component view (does not req. authentication)
        path: 'not-found',
        component: NotFoundComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'session/not-found'
  }
]
