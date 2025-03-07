import { ApprovalChainLevel } from './approval-chain-level.model';
import { Approver } from './approver.model';
import { ApprovalChainNotifyType } from './enums';

export class ApprovalChain {
    public approverLevels: Array<ApprovalChainLevel>;
    public hasGlobalNotify: boolean;
    public globalNotifyApprovers: Array<Approver>;
    public approvalChainNotifyType: ApprovalChainNotifyType;

    constructor(args) {
        this.approverLevels = args.approverLevels || new Array<ApprovalChainLevel>();
        this.hasGlobalNotify = args.hasGlobalNotify;
        this.globalNotifyApprovers = args.globalNotifyApprovers || new Array<Approver>();
        this.approvalChainNotifyType = args.approvalChainNotifyType;
    }
}
