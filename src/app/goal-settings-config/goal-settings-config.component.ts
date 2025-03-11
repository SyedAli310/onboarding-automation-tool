import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { GoalTerminology, ObjectiveManagerType, WeightageType } from '../shared/models/enums';

import { HotToastService } from '@ngneat/hot-toast';

import { ObjectiveSettings } from '../shared/models/objective-settings.model';
import { EmployeeRole } from '../shared/models/enum.model';
import { SmartOnboardService } from '../smart-onboard-view/services/smart-onboard.service';
import { GroupObjectiveLevelConfig, IndividualObjectiveLevelConfig, ObjectiveLevelConfig, ObjectiveLevelSettings, ObjectiveManager } from '../shared/models/objective-level-setting.model';
import { appearAnimation } from '../shared/animations/animations';

@Component({
  selector: 'app-goal-settings-config',
  templateUrl: './goal-settings-config.component.html',
  animations: [appearAnimation]
})
export class GoalSettingsConfigComponent {
    generatedSoW: string;
    onSave: Function;
    objectiveSettings: ObjectiveSettings;; 
    goalTerminology = GoalTerminology;
    weightageType = WeightageType;
    goalTerminologies: any;
    isFormSubmitted: boolean;
    managerRole = EmployeeRole;
    roles = [];
    companyObjectiveManagerRoles = [];
    departmentObjectiveManagerRoles = [];
    individualObjectiveManagerRoles = [];
    isEditMode: boolean = false;
    isLoading: boolean = false;
    isSaving: boolean = false;

    get isMeetingIdStored() {
        return !!localStorage.getItem('meetingId');
    }

    get defaultObjectiveLevelSettings() {
        return new ObjectiveLevelSettings({
            individualObjectivesConfig: new IndividualObjectiveLevelConfig({ isVisibleToEveryone: true }),
            companyObjectivesConfig:  new ObjectiveLevelConfig({ isVisibleToEveryone: true }),
            groupObjectivesConfig:  [new GroupObjectiveLevelConfig({ isVisibleToEveryone: true })],
        });
    }

    constructor(
        public goalSettingsModalRef: BsModalRef,
        private toastService: HotToastService,
        private _smartOnboardAPI: SmartOnboardService,
    ) {}

    ngOnInit(): void {
        this.goalTerminologies = this.goalTerminology.getAll();
        this.objectiveSettings = new ObjectiveSettings({objectiveLevelSettings: this.defaultObjectiveLevelSettings});
        this.objectiveSettings.objectiveAlias = 'KRA';
        this.objectiveSettings.keyResultAlias = 'KPI';
        this.objectiveSettings.initiativeAlias = 'Task';
        this.initializeRoles();
        if (!this.generatedSoW) {
            this.extractSoW();
        } else {
            this.getAIGeneratedObjectiveSettings();
        }
    }

    extractSoW() {
        if (this.isMeetingIdStored) {
            this.isLoading = true;
            const storedMeetingId = localStorage.getItem('meetingId');
            this._smartOnboardAPI.extractSoWData(storedMeetingId).subscribe({
                next: (response) => {
                    this.generatedSoW = response?.explanation ?? null;
                    this.isLoading = false;
                    this.getAIGeneratedObjectiveSettings();
                },
                error: (error) => {
                    this.toastService.error(error?.message || 'Error generating SoW', { position: 'top-right' });
                    this.isLoading = false;
                }
            });
        }
    }

    getAIGeneratedObjectiveSettings() {
        this.isLoading = true;
        this._smartOnboardAPI.getAIGeneratedGoalSettings(this.generatedSoW).subscribe({
            next: (response) => {
                this.objectiveSettings = new ObjectiveSettings({...response, objectiveLevelSettings: this.defaultObjectiveLevelSettings});
                this.objectiveSettings.objectiveAlias = 'KRA';
                this.objectiveSettings.keyResultAlias = 'KPI';
                this.objectiveSettings.initiativeAlias = 'Task';
                // this.setDefaultSettings();
            },
            error: (error) => {
                this.toastService.error(error?.message ?? 'Error getting goal settings', { position: 'top-right' });
                // this.setDefaultSettings();
            }
        }).add( () => this.isLoading = false);
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

    handleManagerSelection(manager: any, type: string) {
        let config: IndividualObjectiveLevelConfig | GroupObjectiveLevelConfig | ObjectiveLevelConfig = type === 'INDIVIDUAL' ? this.objectiveSettings?.objectiveLevelSettings.individualObjectivesConfig : 
            type === 'DEPARTMENT' ? this.objectiveSettings?.objectiveLevelSettings.groupObjectivesConfig[0] :
            type === 'COMPANY' ? this.objectiveSettings?.objectiveLevelSettings.companyObjectivesConfig : null;

        config.managers.map(m => m.objectiveManagerType).includes(manager.type) ?
        config.managers = config.managers.filter(m => m.objectiveManagerType !== manager.type) :
        config.managers.push({
            objectiveManagerType: manager.type,
            managerName: manager.name,
            managerId: null,
            managerProfileImageUrl: null
        });
    }

    isManagerSelected(manager: any, type: string) {
        let config: IndividualObjectiveLevelConfig | GroupObjectiveLevelConfig | ObjectiveLevelConfig = type === 'INDIVIDUAL' ? this.objectiveSettings?.objectiveLevelSettings.individualObjectivesConfig : 
        type === 'DEPARTMENT' ? this.objectiveSettings?.objectiveLevelSettings.groupObjectivesConfig[0] :
        type === 'COMPANY' ? this.objectiveSettings?.objectiveLevelSettings.companyObjectivesConfig : null;

        return config.managers.map(m => m.objectiveManagerType).includes(manager.type);
    }

    getSelectedManagers(managers: Array<ObjectiveManager>) {
        return managers.map(m => m.managerName).join(', ');
    }
    
    setDefaultSettings() {
        console.log('Default settings applied!');
        this.objectiveSettings.useKeyResults = true;
        this.objectiveSettings.isKeyResultsMandatory = false;
        this.objectiveSettings.goalTerminology = GoalTerminology.Objective,
        this.objectiveSettings.objectiveLevelSettings = new ObjectiveLevelSettings({
            individualObjectivesConfig: new IndividualObjectiveLevelConfig({ isVisibleToEveryone: true }),
            companyObjectivesConfig:  new ObjectiveLevelConfig({ isVisibleToEveryone: true }),
            groupObjectivesConfig:  [new GroupObjectiveLevelConfig({ isVisibleToEveryone: true })],
        });
        this.objectiveSettings.isRollupEnabled = false,
        this.objectiveSettings.canUpdateObjectiveProgress = false;
    }

    saveGoalSettings() {
        this.isSaving = true;
        this._smartOnboardAPI.saveGoalSettings(this.objectiveSettings).subscribe({
            next: () => {
                this.toastService.success('Goal settings updated successfully');
                this.closeModal();
                this.onSave && this.onSave();
            },
            error: (error) => {
                this.toastService.error(error?.message ?? 'Error saving goal settings', { position: 'top-right' });
            }
        }).add( () => this.isSaving = false);
    }
    
    closeModal() {
        this.goalSettingsModalRef.hide();
    }
}
