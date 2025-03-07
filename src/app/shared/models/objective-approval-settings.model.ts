import { ApprovalRequestType, SystemGroupType } from './enums';
import { ApprovalSettings } from './approval-settings.model';

export class ObjectiveApprovalSettings {
    individualLevelApprovalSettings: ApprovalSettings;
    groupLevelApprovalSettings: Array<GroupObjectiveApprovalSettings>;
    isGoalDigestEnabled:boolean;

    constructor(args) {
        this.individualLevelApprovalSettings = args.individualLevelApprovalSettings || new ApprovalSettings({
            requireApproval: false,
            approvalRequestType: ApprovalRequestType.Objective,
        });
        this.groupLevelApprovalSettings = args.groupLevelApprovalSettings && args.groupLevelApprovalSettings.length > 0 
                                            ? args.groupLevelApprovalSettings
                                            : [new GroupObjectiveApprovalSettings({
                                                systemGroupType: SystemGroupType.Department,
                                                requireApproval: false,
                                                approvalRequestType: ApprovalRequestType.Objective,
                                            })];
            this.isGoalDigestEnabled=args.isGoalDigestEnabled;
    }
}

export class GroupObjectiveApprovalSettings extends ApprovalSettings {
    systemGroupType: SystemGroupType;

    constructor(args) {
        super(args);
        this.systemGroupType = args.systemGroupType;
    }
}
