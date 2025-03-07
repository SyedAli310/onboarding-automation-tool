import { ApproverType } from "./enums";

export class Approver {
    public approverType: ApproverType;
    public approverId: number;
    public approverName: string;
    public approverProfileImage: string;
    public approverGroupTypeId: number;

    constructor(args) {
        this.approverType = args.approverType;
        this.approverId = args.approverId;
        this.approverName = args.approverName;
        this.approverProfileImage = args.approverProfileImage;
        this.approverGroupTypeId = args.approverGroupTypeId;
    }
}
