import { Component } from '@angular/core';

import { appearAnimation, enterLeaveAnimation5 } from './shared/animations/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [appearAnimation, enterLeaveAnimation5]
})
export class AppComponent {

  constructor() { }

}
