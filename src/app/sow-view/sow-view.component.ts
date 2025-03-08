import { Component, Input, OnInit } from '@angular/core';

import { HotToastService } from '@ngneat/hot-toast';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { SmartOnboardService } from '../smart-onboard-view/services/smart-onboard.service';

@Component({
  selector: 'app-sow-view',
  templateUrl: './sow-view.component.html'
})
export class SowViewComponent implements OnInit {
    @Input() generatedSoW: string; 

    constructor(
        private sowViewModalRef: BsModalRef,
        private toastService: HotToastService,
        private _smartOnboardAPI: SmartOnboardService,
    ) {}

    ngOnInit(): void {
        if (!this.generatedSoW?.trim()?.length) {
            this.extractSoW();
        }
    }

    extractSoW() {
        if (!!localStorage.getItem('meetingId')) {
            const storedMeetingId = localStorage.getItem('meetingId');
            this._smartOnboardAPI.extractSoWData(storedMeetingId).subscribe({
                next: (response) => {
                    this.generatedSoW = response?.explanation ?? null;
                },
                error: (error) => {
                    this.toastService.error(error?.message || 'Error generating SoW');
                }
            })
        }
    }

    closeModal() {
        this.sowViewModalRef.hide();
    }
}
