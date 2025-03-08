import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HotToastService } from '@ngneat/hot-toast';
import moment from 'moment';

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
    isFormSubmitted: boolean = false;
    generatedSoW: string | null;
    @ViewChild('scheduleMeetingModal', { static: true }) scheduleMeetingModal: TemplateRef<any>;

    get isMeetingDataValid() {
        return !!this.scheduleMeetingView.subject && this.scheduleMeetingView.attendees?.length > 0;
    }

    get isMeetingIdStored() {
        return !!localStorage.getItem('meetingId');
    }

    get meetingStart() {
        return !!localStorage.getItem('meetingStartTime') ? localStorage.getItem('meetingStartTime') : null;
    }

    get joinUrl() {
        return !!localStorage.getItem('joinUrl') ? localStorage.getItem('joinUrl') : null;
    }

    constructor(
        private modalService: BsModalService,
        private toastService: HotToastService,
        private _smartOnboardAPI: SmartOnboardService,
    ) {}

    ngOnInit(): void {
        
    }

    scheduleMeeting() {
        this.isFormSubmitted = true;
        const scheduleMeetingView = {...this.scheduleMeetingView, startTime: this.scheduleMeetingView.startTime.toISOString(), endTime: this.scheduleMeetingView.endTime.toISOString()}
        if (this.isMeetingDataValid) {
            this.isSchedulingInProgress = true;
            this._smartOnboardAPI.scheduleOnboardingMeeting(scheduleMeetingView).subscribe({
                next: (response) => {
                    this.scheduleMeetingModalRef.hide();
                    this.toastService.success('Meeting scheduled successfully');
                    this.saveMeetingDataToStorage(response?.joinUrl, response?.meetingId, scheduleMeetingView.startTime);
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
            const loadingToast = this.toastService.loading('AI is generating SoW... This may take a moment.');
            const storedMeetingId = localStorage.getItem('meetingId');
            this._smartOnboardAPI.extractSoWData(storedMeetingId).subscribe({
                next: (response) => {
                    loadingToast.close();
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

    getDate() {
        return moment(new Date()).format('Do MMM, YYYY');
    }

    saveMeetingDataToStorage(joinUrl: string, meetingId: string, startTime: string) {
        localStorage.setItem('joinUrl', joinUrl);
        localStorage.setItem('meetingId', meetingId);
        localStorage.setItem('meetingStartTime', startTime);
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

    formatDate(isoString: string): string {
        return moment(isoString).format("Do MMM YYYY (ddd), [at] hh:mm A");
    } 
    
    openGoalSettingsModal() {
        const initialState = {
            generatedSoW: this.generatedSoW
        }
        this.modalService.show(GoalSettingsConfigComponent, { initialState, class: 'right-modal right-modal-800', ignoreBackdropClick: true, keyboard: false });
    }
}

