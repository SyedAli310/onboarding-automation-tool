import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { GoalTerminology } from '../shared/models/enums';
import { FormControl, FormGroup } from '@angular/forms';

import { ObjectiveSettings } from '../shared/models/objective-settings.model';

@Component({
  selector: 'app-goal-settings-config',
  templateUrl: './goal-settings-config.component.html',
})
export class GoalSettingsConfigComponent {
    objectiveSettings: ObjectiveSettings = new ObjectiveSettings({}); 
    objectiveSettingsForm: FormGroup;
    goalTerminology = GoalTerminology;
    goalTerminologies;
    isFormSubmitted: boolean;

    constructor(
        public goalSettingsModalRef: BsModalRef,
        // private notificationService: NotificationService,
    ) {}

    ngOnInit(): void {
        this.goalTerminologies = this.goalTerminology.getAll();
        this.initializeForm();
    }

    validationMessages = {
        objectiveAlias: [
            { type: 'required', message: `Goal label is required` }
        ],
        keyResultAlias: [
            { type: 'required', message: `Sub-goal label is required` }
        ],
        initiativeAlias: [
            { type: 'required', message: 'Task label is required' }
        ],
    }

    initializeForm() {
        this.objectiveSettingsForm = new FormGroup({
            useKeyResults: new FormControl(this.objectiveSettings.useKeyResults),
            isKeyResultsMandatory: new FormControl(this.objectiveSettings.isKeyResultsMandatory),
            goalTerminology: new FormControl(this.objectiveSettings.goalTerminology || GoalTerminology.Custom),
            objectiveAlias: new FormControl({
                value: !this.objectiveSettings.goalTerminology || this.objectiveSettings.goalTerminology === GoalTerminology.Custom ? this.objectiveSettings.objectiveAlias : '',
                disabled: !this.objectiveSettings.goalTerminology || (this.objectiveSettings.goalTerminology && this.objectiveSettings.goalTerminology != GoalTerminology.Custom),
            }, this.objectiveAliasValidator.bind(this)),
            keyResultAlias: new FormControl({
                value: !this.objectiveSettings.goalTerminology || this.objectiveSettings.goalTerminology === GoalTerminology.Custom ? this.objectiveSettings.keyResultAlias :  '',
                disabled: !this.objectiveSettings.goalTerminology || (this.objectiveSettings.goalTerminology && this.objectiveSettings.goalTerminology != GoalTerminology.Custom)
            }, this.keyResultAliasValidator.bind(this)),
            initiativeAlias : new FormControl(!this.objectiveSettings.goalTerminology || this.objectiveSettings.goalTerminology === GoalTerminology.Custom ? this.objectiveSettings.initiativeAlias : '', this.initiativeAliasValidator.bind(this))
        });

        this.objectiveSettingsForm.get('goalTerminology').valueChanges.subscribe({
            next: () => {
                this.objectiveSettingsForm.get("initiativeAlias").updateValueAndValidity();
            }
        })
    }

    getUpdatedSettings() {
        const form = this.objectiveSettingsForm.getRawValue();
        const updatedSettings = {
            useKeyResults: form.useKeyResults,
            isKeyResultsMandatory: form.isKeyResultsMandatory,
            goalTerminology: form.goalTerminology,
            objectivesAlias: form.goalTerminology === GoalTerminology.Custom ? form.objectiveAlias : this.getObjectiveTerminology(form.goalTerminology),
            keyResultAlias: form.goalTerminology === GoalTerminology.Custom ? form.keyResultAlias : this.getKeyResultTerminology(form.goalTerminology),
            initiativeAlias: form.goalTerminology === GoalTerminology.Custom ? form.initiativeAlias : this.getInitiativeTerminology(form.goalTerminology),
            canUpdateObjectiveProgress: !form.useKeyResults || this.objectiveSettings.canUpdateObjectiveProgress 
        };

        return updatedSettings;
    }

    getObjectiveTerminology(terminology) {
        switch (terminology){
            case GoalTerminology.Goal:
                return 'Goal';
            case GoalTerminology.Objective:
                return 'Objective';
            case GoalTerminology.KRA:
                return 'KRA';
            case GoalTerminology.Custom:
                return 'Goal';
            default:
                return '';
        }
    }

    getKeyResultTerminology(terminology) {
        switch (terminology){
            case GoalTerminology.Goal:
                return 'Sub-goal';
            case GoalTerminology.Objective:
                return 'Key-result';
            case GoalTerminology.KRA:
                return 'KPI';
            case GoalTerminology.Custom:
                return 'Sub-goal';
            default:
                return '';
        }
    }

    getInitiativeTerminology(terminology) {
        switch (terminology){
            case GoalTerminology.Goal:
                return 'Task';
            case GoalTerminology.Objective:
                return 'Initiative';
            case GoalTerminology.KRA:
                return 'Task';
            case GoalTerminology.Custom:
                return 'Task';
            default:
                return '';
        }
    }

    getKeyResultTerminologyInfo(terminology) {
        switch (terminology){
            case GoalTerminology.Goal:
                return 'Break your main goal into smaller, achievable Sub Goals';
            case GoalTerminology.Objective:
                return 'Define measurable outcomes to quantify success towards each Objective';
            case GoalTerminology.KRA:
                return 'Pinpoint critical indicators for success measurement';
            case GoalTerminology.Custom:
                return 'Break your main goal into smaller, achievable Sub Goals';
            default:
                return '';
        }
    }

    objectiveAliasValidator(control) {
        if(this.objectiveSettingsForm){
            const goalTerminology = this.objectiveSettingsForm.get('goalTerminology').value;
            if(goalTerminology === GoalTerminology.Custom 
                && (!control.value || control.value.trim().length === 0)) {
                return { required : true };
            }
            return null;
        }
        return null;
    }

    keyResultAliasValidator(control) {
        if(this.objectiveSettingsForm){
            const goalTerminology = this.objectiveSettingsForm.get('goalTerminology').value;
            if(goalTerminology === GoalTerminology.Custom && this.objectiveSettingsForm.get('useKeyResults').value
                && (!control.value || control.value.trim().length === 0)) {
                return { required : true };
            }
            return null;
        }
        return null;
    }

    initiativeAliasValidator(control) {
        if(this.objectiveSettingsForm){
            const goalTerminology = this.objectiveSettingsForm.get('goalTerminology').value;
            if(goalTerminology === GoalTerminology.Custom
                && (!control.value || control.value.trim().length === 0)) {
                return { required : true };
            }
            return null;
        }
        return null;
    }

    isCustomAlias() {
        return this.objectiveSettingsForm && this.objectiveSettingsForm.get('goalTerminology').value === GoalTerminology.Custom;
    }

    isKeyResultEnabled() {
        return this.objectiveSettingsForm && this.objectiveSettingsForm.get('useKeyResults').value;
    }

    changeGoalTerminology(terminology) {
        this.objectiveSettingsForm.get('goalTerminology').setValue(terminology);
        if(terminology === GoalTerminology.Custom){
            this.objectiveSettingsForm.get('objectiveAlias').enable();
            this.objectiveSettingsForm.get('keyResultAlias').enable();
            return;
        }

        this.objectiveSettingsForm.get('objectiveAlias').disable();
        this.objectiveSettingsForm.get('keyResultAlias').disable();
    }

    toggleUseKeyResult(useKeyResults) {
        this.objectiveSettingsForm.get('useKeyResults').setValue(useKeyResults);
        if(!useKeyResults) {
            this.objectiveSettingsForm.get('keyResultAlias')?.setValue(this.objectiveSettings.keyResultAlias);
            this.objectiveSettingsForm.get('isKeyResultsMandatory')?.setValue(useKeyResults);
        }
    }

    toggleMandateKeyResult(mandateKeyResults) {
        this.objectiveSettingsForm.get('isKeyResultsMandatory').setValue(mandateKeyResults);
    }

    getObjectiveAliasDescription(terminology) {
        switch(terminology) {
            case GoalTerminology.Goal:
                return `Define broad targets to guide your team. Suitable for setting high-level objectives without needing immediate specifics. This option allows flexibility in how goals are pursued and achieved.`;
            case GoalTerminology.Objective:
                return `Set clear objectives with measurable outcomes. Ideal for tracking progress and achieving specific results. OKRs help ensure alignment and focus on what truly matters.`;
            case GoalTerminology.KRA:
                return `Outline key areas of responsibility. Useful for focusing on specific roles and their contributions to overall success. KRAs emphasize accountability and clarity in job roles.`;
            case GoalTerminology.Custom:
                return `Customize the terminology to fit your organization's unique needs. Great for aligning language with your internal processes. This option ensures the goal-setting framework resonates with your team's culture.`;
            default:
                return '';
        }
    }

    getSelectedGoalTerminology() {
        switch(this.objectiveSettingsForm.get('goalTerminology').value) {
            case GoalTerminology.Goal:
                return `Goal`;
            case GoalTerminology.Objective:
                return `Objective`;
            case GoalTerminology.KRA:
                return `KRA`;
            default:
                return '';
        }
    }

    getSelectedSubGoalTerminology() {
        switch(this.objectiveSettingsForm.get('goalTerminology').value) {
            case GoalTerminology.Goal:
                return `Sub goal`;
            case GoalTerminology.Objective:
                return `Key result`;
            case GoalTerminology.KRA:
                return `KPI`;
            default:
                return '';
        }
    }

    getSelectedTaskTerminology() {
        switch(this.objectiveSettingsForm.get('goalTerminology').value) {
            case GoalTerminology.Goal:
                return `Task`;
            case GoalTerminology.Objective:
                return `Initiative`;
            case GoalTerminology.KRA:
                return `Task`;
            default:
                return '';
        }
    }

    getKeyResultAliasDescription(terminology) {
        switch(terminology) {
            case GoalTerminology.Goal:
                return `A breakup of the larger goal into smaller, trackable goals/steps that help in tracking progress & achieving the larger goal. e.g., "Increase website traffic by 20%."`;
            case GoalTerminology.Objective:
                return `Measurable outcomes that helps one track progress towards achieving the objective. e.g., "Increase user adoption by 20%."`;
            case GoalTerminology.KRA:
                return `A metric used to measure performance/progress in achieving objectives within the KRA. e.g., "Number of bugs found in the codebase per month."`;
            default:
                return '';
        }
    }
    
    getTerminologyTitle(terminology) {
        switch(terminology) {
            case GoalTerminology.Goal:
                return this.isKeyResultEnabled() ? `Goal and Sub goal` : `Goal`;
            case GoalTerminology.Objective:
                return this.isKeyResultEnabled() ? `Objective and Key result (OKR)` : `Objective`;
            case GoalTerminology.KRA:
                return this.isKeyResultEnabled() ? `Key Responsibility Area (KRA) and Key Performance Indicator (KPI)` : `Key Responsibility Area (KRA)`;
            case GoalTerminology.Custom:
                return 'Custom Terminology';
            default:
                return this.isKeyResultEnabled() ? 'Goal and Sub goal' : 'Goal';
        }
    }

    isTerminologySelected(terminologyId: GoalTerminology) {
        return this.objectiveSettingsForm.get('goalTerminology').value === terminologyId;
    }

    getSelectedTerminology() {
        return GoalTerminology.getAll().find(gt => gt['id'] === this.objectiveSettingsForm.get('goalTerminology').value);
    }

    isCustomTerminology() {
        return this.objectiveSettingsForm.get('goalTerminology').value === GoalTerminology.Custom;
    }

    saveGoalSettings() {}

    closeModal() {
        this.goalSettingsModalRef.hide();
    }
}
