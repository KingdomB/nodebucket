/**
 * Title: app.component.ts
 * Author: Professor Krasso
 * Date: 5th December 2020
 * Modified By: King Major
 * Description: app component
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: [``]
})
export class AppComponent {
  title = 'nodebucket'
}
