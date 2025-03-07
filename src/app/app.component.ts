import { Component } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';

import { appearAnimation, enterLeaveAnimation5 } from './animations/animations';
import { GoalSettingsConfigComponent } from './goal-settings-config/goal-settings-config.component';
import { ignoreElements } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [appearAnimation, enterLeaveAnimation5]
})
export class AppComponent {
  title = 'onboarding-automation-tool';
  isCoreHrExpanded: boolean = false;
  isPMSExpanded: boolean = false;
  isPayrollExpanded: boolean = false;
  isTimeSheetExpanded: boolean = false;

  constructor(private modalService: BsModalService) { }

  openGoalSettingsModal() {
    this.modalService.show(GoalSettingsConfigComponent, { class: 'right-modal right-modal-600', ignoreBackdropClick: true, keyboard: false });
  }
}
