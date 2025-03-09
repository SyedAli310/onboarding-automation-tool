import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { ApiService } from '../../shared/services/api.service';
import { ObjectiveSettings } from '../../shared/models/objective-settings.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SmartOnboardService extends ApiService {
    private BACKEND_URL = 'https://customer-onboarding-ajhrbjhddwasgpcf.centralus-01.azurewebsites.net';
    private KEKA_URL = 'https://saisrik.kekad.com/k/default/api';

    private httpHeader: HttpHeaders;

    constructor(private _http: HttpClient) {
        super(_http);
    }

    extractSoWData(meetingId: string): Observable<any> {
        return this.post(`${this.BACKEND_URL}/api/Onboarding/extract/sow/${meetingId}`).pipe(map(data => data));
    }

    scheduleOnboardingMeeting(meetingDataView: any): Observable<any> {
        return this.post(`${this.BACKEND_URL}/api/Onboarding/meeting/schedule`, meetingDataView).pipe(map(data => data));
    }

    getAIGeneratedGoalSettings(transcript: string): Observable<any> {
        return this.post(`${this.KEKA_URL}/kekaai/configurations`, this.getConfigPayload(transcript)).pipe(map(data => data));
    }

    saveGoalSettings(objectiveSettings: ObjectiveSettings): Observable<any> {
        return this.put(`${this.KEKA_URL}/pms/objectives/settings`, objectiveSettings).pipe(map(data => data));
    }

    getConfigPayload(prompt: string) {
        return {
            "department": "advicers",
            "jobRole": "developer",
            "version": 1,
            "summary": prompt,
            "responseFormat": "{IsModernOKR: boolean,IsAlignmentEnabled: boolean,IsRollupEnabled: boolean,ObjectiveWeightageType: string,UseKeyResults:boolean,IsKeyResultsMandatory:boolean,IsWeightageMandatory:boolean,UseInitiatives:boolean,CanUpdateObjectiveProgress:boolean,KeyResultsWeightageType:string,MaxObjectivesPerIndividual:int,MinObjectivesPerIndividual:int,AllowObjectivePriorities:boolean,CanAlignPrivateObjectives:boolean,TimeFrameFrequencies:[],UpdateFrequency:string,AutoCloseTimeFrames:boolean,CycleStartMonth:int,IsGoalSystemUpgraded:boolean,GoalTerminology:string,ObjectiveAlias:string,KeyResultAlias:string,InitiativeAlias:string,TagSettings:{AreObjectiveTagsEnabled:boolean,CanEmployeeCreateTags:boolean,AreEmployeeTagsVisible:boolean,TagAlias:string}}"
        }
    }
}
