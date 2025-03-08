import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HotToastService } from '@ngneat/hot-toast';

import { GoalSettingsConfigComponent } from '../goal-settings-config/goal-settings-config.component';
import { appearAnimation, enterLeaveAnimation5 } from '../shared/animations/animations';
import { SmartOnboardService } from './services/smart-onboard.service';
import { ScheduleMeetingView } from './models/schedule-meeting-view.model';
import { SowViewComponent } from '../sow-view/sow-view.component';

@Component({
  selector: 'app-smart-onboard-view',
  templateUrl: './smart-onboard-view.component.html',
  animations: [appearAnimation, enterLeaveAnimation5]
})
export class SmartOnboardViewComponent implements OnInit {
    isCoreHrExpanded: boolean = false;
    isPMSExpanded: boolean = false;
    isPayrollExpanded: boolean = false;
    isTimeSheetExpanded: boolean = false;
    
    scheduleMeetingModalRef: BsModalRef;
    scheduleMeetingView: ScheduleMeetingView;
    isSchedulingInProgress: boolean = false;
    isSoWExtractionInProgress: boolean = false;
    generatedSoW: string | null;
    @ViewChild('scheduleMeetingModal', { static: true }) scheduleMeetingModal: TemplateRef<any>;

    get isMeetingDataValid() {
        return !!this.scheduleMeetingView.subject && this.scheduleMeetingView.attendees?.length > 0;
    }

    get isMeetingIdStored() {
        return !!localStorage.getItem('meetingId');
    }

    constructor(
        private modalService: BsModalService,
        private toastService: HotToastService,
        private _smartOnboardAPI: SmartOnboardService,
    ) {}

    ngOnInit(): void {
        
    }

    scheduleMeeting() {
        const scheduleMeetingView = {...this.scheduleMeetingView, startTime: this.scheduleMeetingView.startTime.toISOString(), endTime: this.scheduleMeetingView.endTime.toISOString()}
        if (this.isMeetingDataValid) {
            this.isSchedulingInProgress = true;
            this._smartOnboardAPI.scheduleOnboardingMeeting(scheduleMeetingView).subscribe({
                next: (response) => {
                    this.scheduleMeetingModalRef.hide();
                    this.toastService.success('Meeting scheduled successfully');
                    this.saveMeetingDataToStorage(response?.joinUrl, response?.meetingId);
                },
                error: (error) => {
                    this.toastService.error(error?.message ?? 'Error while scheduling meeting');
                }
            }).add( () => this.isSchedulingInProgress = false);
        } else {
            this.toastService.error('Missing required fields');
        }
    }

    extractSoW() {
        if (this.isMeetingIdStored) {
            this.isSoWExtractionInProgress = true;
            const storedMeetingId = localStorage.getItem('meetingId');
            this._smartOnboardAPI.extractSoWData(storedMeetingId).subscribe({
                next: (response) => {
                    this.toastService.success('SoW generated successfully');
                    this.generatedSoW = response?.explanation ?? null;
                },
                error: (error) => {
                    this.toastService.error(error?.message || 'Error generating SoW');
                }
            }).add( () => this.isSoWExtractionInProgress = false);
        }
    }

    getTime(date: Date) {
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }

    saveMeetingDataToStorage(joinUrl: string, meetingId: string) {
        localStorage.setItem('joinUrl', joinUrl);
        localStorage.setItem('meetingId', meetingId);
    }

    openScheduleMeetingModal() {
        this.scheduleMeetingView = new ScheduleMeetingView({});
        this.scheduleMeetingModalRef = this.modalService.show(this.scheduleMeetingModal, { class: 'border-radius-16 modal-dialog modal-md overflow-hidden', ignoreBackdropClick: true });
    }

    openSoWViewModal() {
        const initialState = {
            generatedSoW: this.generatedSoW
        };

        this.modalService.show(SowViewComponent, { initialState, class: 'right-modal right-modal-600', ignoreBackdropClick: true});
    }
    
    openGoalSettingsModal() {
        this.modalService.show(GoalSettingsConfigComponent, { class: 'right-modal right-modal-600', ignoreBackdropClick: true, keyboard: false });
    }
}

