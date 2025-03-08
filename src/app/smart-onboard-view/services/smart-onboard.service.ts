import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { ApiService } from '../../shared/services/api.service';

@Injectable({
    providedIn: 'root'
})
export class SmartOnboardService extends ApiService {
    private BACKEND_URL = 'https://customer-onboarding-ajhrbjhddwasgpcf.centralus-01.azurewebsites.net';

    extractSoWData(meetingId: string): Observable<any> {
        return this.post(`${this.BACKEND_URL}/api/Onboarding/extract/sow/${meetingId}`).pipe(map(data => data));
    }

    scheduleOnboardingMeeting(meetingDataView: any): Observable<any> {
        return this.post(`${this.BACKEND_URL}/api/Onboarding/meeting/schedule`, meetingDataView).pipe(map(data => data));
    }
}
