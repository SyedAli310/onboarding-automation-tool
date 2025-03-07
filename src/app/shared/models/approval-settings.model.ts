import { ApprovalChain } from './approval-chain.model';
import { ApprovalRequestType } from './enums';

export class ApprovalSettings {
    public approvalRequestType: ApprovalRequestType;
    public requireApproval: boolean;
    public requireApprovalComment: boolean;
    public requireRejectionComment: boolean;
    public approvalChain: ApprovalChain;
    public autoApprovedIfNoApproversAvailable: boolean;
    public lastLevel: number;
    public disableApproverNotification: boolean;
    public notifyPreviousApproversIfRejected: boolean;

    constructor(args) {
        this.approvalRequestType = args.approvalRequestType;
        this.requireApproval = args.requireApproval;
        this.requireApprovalComment = args.requireApprovalComment;
        this.requireRejectionComment = args.requireRejectionComment;
        this.approvalChain = args.approvalChain || new ApprovalChain({});
        this.autoApprovedIfNoApproversAvailable = args.autoApprovedIfNoApproversAvailable;
        this.lastLevel = args.lastLevel;
        this.disableApproverNotification = args.disableApproverNotification;
        this.notifyPreviousApproversIfRejected = args.notifyPreviousApproversIfRejected;
    }
}
