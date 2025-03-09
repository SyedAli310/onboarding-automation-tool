import { Enum } from "./enum.model";

export class GoalTerminology extends Enum {
    static Goal = 1;
    static Objective = 2;
    static KRA = 3;
    static Custom = 99;
    static 1 = 'Goal and Sub-goal';
    static 2 = 'Objective and Key Result';
    static 3 = 'Key Responsibility Area';
    static 99 = 'Custom Terminology';
}

export class Frequency extends Enum {
    static Monthly = 0;
    static BiMonthly = 1;
    static Quarterly = 2;
    static HalfYearly = 3;
    static Yearly = 4;
    static MultiYearly = 5;
    static Custom = 6;
    static 0 = 'Monthly';
    static 1 = 'BiMonthly';
    static 2 = 'Quarterly';
    static 3 = 'Half Yearly';
    static 4 = 'Yearly';
    static 5 = 'MultiYearly';
    static 6 = 'Custom';
}

export class GoalStatus extends Enum {
    static NotStarted = 0;
    static OnTrack = 1;
    static NeedAttention = 2;
    static AtRisk = 3;
    static Closed = 4;

    static 0 = 'Not started';
    static 1 = 'On track';
    static 2 = 'Needs attention';
    static 3 = 'At risk';
    static 4 = 'Closed';
}

export class ObjectiveUpdateFrequency extends Enum {
    static None = 0;
    static Weekly = 1;
    static Fortnightly = 2;
    static Monthly = 3;
    static 0 = 'None';
    static 1 = 'Weekly';
    static 2 = 'Fortnightly';
    static 3 = 'Monthly';
}

export class WeightageType extends Enum {
    static EqualWeight = 0;
    static UserDefined = 1;
    static 0 = 'Equal Weight';
    static 1 = 'User Defined';
}

export class ObjectiveManagerType extends Enum {
    static None = 0;
    static ReportingManager = 1;
    static ProjectManager = 2;
    static ClientManager = 3;
    static L2Manager = 4;
    static DepartmentHead = 5;
    static BusinessUnitHead = 6;
    static PayrollAdmin = 7;
    static DottedLineManager = 10;
    static Employee = 99;
    static Self = 9999;
    static 0 = 'None';
    static 1 = 'Reporting Manager';
    static 2 = 'Project Manager';
    static 3 = 'Client Manager';
    static 4 = 'L2 Manager';
    static 5 = 'Department Head';
    static 6 = 'Business Unit Head';
    static 7 = 'Payroll Admin';
    static 10 = 'DottedLineManager';
    static 99 = 'Employee';
    static 9999 = 'Self';
}

export class SystemGroupType extends Enum {
    static None = 0;
    static BusinessUnit = 1;
    static Department = 2;
    static OrgLocation = 3;
    static CostCenter = 4;
    static Paygroup = 5;
    static ProjectTeam = 6;
    static Team = 7;
    static ClientTeam = 8;
    static LegalEntity = 9;
    static 0 = 'None';
    static 1 = 'Business Unit';
    static 2 = 'Department';
    static 3 = 'Location';
    static 4 = 'Cost Center';
    static 5 = 'Paygroup';
    static 6 = 'Project Team';
    static 7 = 'Team';
    static 8 = 'Client Team';
    static 9 = 'Legal Entity';
}

export class ApprovalRequestType extends Enum {
    static None = 0;
    static LeaveRequest = 1;
    static TimesheetRequest = 2;
    static Attendance = 3;
    static Exit = 4;
    static Loan = 5;
    static Expense = 6;
    static Overtime = 7;
    static Skill = 8;
    static Requisition = 9;
    static InternalJob = 14;
    static Objective = 17;
    static OfferLetter = 18;
    static LeaveEncashment = 21;
    static AssetRequest = 22;
    static PaymentTransaction = 23;
    static ExpenseCategory = 25;
    static ApprovalWorkflow =28;
    static CompOff = 29;
    static AirTicketRequest = 26;
    static ProjectCreation = 30;
    static OpportunityCreation = 31;
    static TaskCreation = 32;
    static CareerTrack = 33;
    static ResourceRequest = 34;
    static ProjectResourceAllocation = 36;
    static OpportunityResourceAllocation = 37;
    static Charge = 35;
    static 0 = 'None';
    static 1 = 'Leave Request';
    static 2 = 'Timesheet Request';
    static 3 = 'Attendance';
    static 4 = 'Exit Request';
    static 5 = 'Loan Request';
    static 6 = 'Expense Request';
    static 7 = 'Overtime';
    static 8 = 'Skill';
    static 9 = 'Requisition';
    static 14 = 'Internal Job';
    static 17 = "Objective";
    static 18 = 'Offer Letter';
    static 21 = 'LeaveEncashment';
    static 22 = 'AssetRequest';
    static 23 = 'PaymentTransaction';
    static 25 = 'ExpenseCategory';
    static 28 = 'Approval Workflow';
    static 29 = 'CompOff';
    static 26 = 'AirTicketRequest';
    static 30 = 'Project Creation';
    static 31 = 'Opportunity Creation';
    static 32 = 'Task Creation';
    static 33 = 'CareerTrack';
    static 34 = 'Resource Request'
    static 36 = 'ProjectResourceAllocation' 
    static 37 = 'OpportunityResourceAllocation'
    static 35 = 'Charge'
}
export class ApproverType extends Enum {
    static None = 0;
    static ReportingManager = 1;
    static ProjectManager = 2;
    static ClientManager = 3;
    static L2Manager = 4;
    static DepartmentHead = 5;
    static BusinessUnitHead = 6;
    static PayrollAdmin = 7;
    static DottedLineManager = 10;
    static AssetManager = 11;
    static Employee = 99;
    static 0 = 'None';
    static 1 = 'Reporting Manager';
    static 2 = 'Project Manager';
    static 3 = 'Client Manager';
    static 4 = 'L2 Manager';
    static 5 = 'Department Head';
    static 6 = 'Business Unit Head';
    static 7 = 'Payroll Admin';
    static 10 = 'Dotted Line Manager';
    static 11 = 'Asset Manager';
    static 99 = 'Employee';
}

export class ApprovalChainNotifyType extends Enum {
    static None = 0;
    static FinalLevel = 1;
    static EachLevel = 2;
    static 0 = 'None';
    static 1 = 'After Final Approval';
    static 2 = 'At Each Level of Approval';
}

export class EmployeeRole extends Enum {
    static None = 0;
    static ReportingManager = 1;
    static ProjectManager = 2;
    static ClientManager = 3;
    static L2Manager = 4;
    static DepartmentHead = 5;
    static BusinessUnitHead = 6;
    static PayrollAdmin = 7;
    static ExpenseManager = 9;
    static DottedLineManager = 10;
    static AssetManager = 11;
    static TravelDeskManager = 12;
    static GroupTypeManager = 98;
    static Employee = 99;
    static Role = 100;

    static 0 = 'None';
    static 1 = 'Reporting Manager';
    static 2 = 'Project Manager';
    static 3 = 'Client Manager';
    static 4 = 'Manager Of Manager';
    static 5 = 'Department Head';
    static 6 = 'BusinessUnit Head';
    static 7 = 'Payroll Admin';
    static 9 = 'Expense Manager';
    static 10 = 'Dotted Line Manager';
    static 11 = 'Asset Manager';
    static 12 = 'Travel Desk Manager'
    static 98 = 'Group type Manager';
    static 99 = 'Employee';
    static 100 = 'Role';
}
