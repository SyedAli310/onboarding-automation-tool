import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { GoalTerminology, ObjectiveManagerType } from '../shared/models/enums';

import { HotToastService } from '@ngneat/hot-toast';

import { ObjectiveSettings } from '../shared/models/objective-settings.model';
import { EmployeeRole } from '../shared/models/enum.model';

@Component({
  selector: 'app-goal-settings-config',
  templateUrl: './goal-settings-config.component.html',
})
export class GoalSettingsConfigComponent {
    objectiveSettings: ObjectiveSettings = new ObjectiveSettings({}); 
    goalTerminology = GoalTerminology;
    goalTerminologies: any;
    isFormSubmitted: boolean;
    managerRole = EmployeeRole;
    roles = [];
    companyObjectiveManagerRoles = [];
    departmentObjectiveManagerRoles = [];
    individualObjectiveManagerRoles = [];

    constructor(
        public goalSettingsModalRef: BsModalRef,
        private toastService: HotToastService,
    ) {}

    ngOnInit(): void {
        this.goalTerminologies = this.goalTerminology.getAll();
        this.initializeRoles();
    }

    initializeRoles() {
        this.departmentObjectiveManagerRoles.push({ name: this.managerRole[5], description: this.managerRole[5], type: this.managerRole.DepartmentHead });
        this.roles.push({ name: this.managerRole[10], description: this.managerRole[10], type: this.managerRole.DottedLineManager });
        this.roles.push({ name: this.managerRole[1], description: this.managerRole[1], type: this.managerRole.ReportingManager });
        this.roles.push({ name: this.managerRole[4], description: this.managerRole[4], type: this.managerRole.L2Manager });
        this.roles.push({ name: this.managerRole[5], description: this.managerRole[5], type: this.managerRole.DepartmentHead });
        this.roles.push({ name: this.managerRole[6], description: this.managerRole[6], type: this.managerRole.BusinessUnitHead });
        this.roles.push({ name: 'Self', description: 'Self', type: ObjectiveManagerType.Self });
        this.companyObjectiveManagerRoles = this.roles;
        this.departmentObjectiveManagerRoles = this.roles;
        this.individualObjectiveManagerRoles = this.roles;
    }

    saveGoalSettings() {
        this.toastService.success('Goal settings saved successfully');
    }

    closeModal() {
        this.goalSettingsModalRef.hide();
    }
}
