import { Approver } from './approver.model';

export class ApprovalChainLevel {
    public level: number;
    public approvers: Array<Approver>;
    public sendApprovalReminders: boolean;
    public approvalReminderInDays: number;
    public skipToNextLevel: boolean;
    public skipToNextLevelInDays: number;
    public skipIfApproverDoesntExist: boolean;
    public isReadOnly: boolean;
    public approvalChainLevelId: number;

    constructor(args) {
        this.level = args.level;
        this.approvers = args.approvers || new Array<Approver>();
        this.sendApprovalReminders = args.sendApprovalReminders;
        this.approvalReminderInDays = args.approvalReminderInDays;
        this.skipToNextLevel = args.skipToNextLevel;
        this.skipToNextLevelInDays = args.skipToNextLevelInDays;
        this.skipIfApproverDoesntExist = args.skipIfApproverDoesntExist;
        this.isReadOnly = args.isReadOnly;
        this.approvalChainLevelId = args.approvalChainLevelId;
    }
}
