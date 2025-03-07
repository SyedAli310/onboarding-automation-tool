import { Component } from '@angular/core';

import { appearAnimation } from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [appearAnimation]
})
export class AppComponent {
  title = 'onboarding-automation-tool';
}
