
export class Enum {
    // getById
    static getById<T>(id): string {
        return this[id];
    }

    //getByName
    static getByName<T>(name: string) {
        return parseInt(Object.keys(this).filter(key => typeof this[key] === 'string').find(key => this[parseInt(key, 10)].toLowerCase() == name.toLowerCase()), 10);
    }

    // getAll
    static getAll(): Array<Object> {
        // which means here we filter only
        return Object.keys(this).filter(key => typeof this[key] === 'string').map(key => {
            const id = parseInt(key, 10);
            return {
                title: this.getById(key),
                id: isNaN(id) ? key : id,
            };
        });
    }
}

export enum ExcelImportStatus {
    None = 0,
    Pending,
    Completed,
    Failed,
    InProgress,
}

/// this basically used to get the roles, where we are using employee and role search
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

export class ExcelImportType extends Enum {
    static None = 0;
    static AddEmployeesPersonalDetails = 1;
    static EmployeeCurrentSalary = 2;
    static Holidays = 3;
    static LeaveSummary = 4;
    static Loans = 5;
    static CarryoverBalance = 6;
    static Assets = 7;
    static JobDetails = 8;
    static EmployerPreviousSalary = 9;
    static Bonuses = 10;
    static EmployeeEffectiveSalary = 11;
    static LossOfDays = 12;
    static Financial = 13;
    static Declaration = 14;
    static EffectiveBonuses = 15;
    static TDSOverride = 16;
    static EmployeeCurrentSalaryWithStructureType = 17;
    static ComponentsOverride = 18;
    static PFOverride = 19;
    static PFAndESIDetails = 20;
    static LeaveRequests = 21;
    static ComponentAccrual = 22;
    static Projects = 23;
    static ProjectTasks = 24;
    static EmployeeBasicDetails = 25;
    static ComponentClaim = 26;
    static ProjectResources = 27;
    static EmployeeEffectiveSalaryWithoutPayroll = 28;
    static OneTimePayments = 29;
    static OneTimeDeductions = 30;
    static EmployeeModules = 31;
    static ESIOverride = 32;
    static PTOverride = 33;
    static BonusesWithAction = 34;
    static Department = 35;
    static Perks = 36;
    static TimesheetRepositoryTask = 37;
    static EmployeePmsDetails = 38;
    static PMSCompetenciesDetails = 39;
    static PMSCompetenciesBehaviourDetails = 40;
    static EmployeeGoalImports = 41;
    static PayGroupAssignment = 42;
    static PreviousComponentClaim = 43;
    static AttendanceLogs = 44;
    static EmployeeProfileCustomFields = 45;
    static AttendanceTimeAssignments = 46;
    static AssetWithCustomField = 47;
    static LeaveAvailableBalance = 48;
    static PayableUnitsOverride = 49;
    static ShiftBoardAssignments = 50;
    static PMSBulkCalibrationImport = 51;
    static OvertimeAdjustedAmount = 52;
    static LopReversalDays = 53;
    static LetterTemplateCustomFields = 54;
    static EmployeePasswordGeneration = 55;
    static EmployeeEmailUpdate = 56;
    static PayrollStatus = 58;
    static EmployeeProfessionalSummary = 59;
    static EmployeeRelations = 60;
    static EmployeeAddress = 61;
    static EmployeeExitInitiation = 62;
    static EmployeeExitSettlement = 63;
    static EmployeeExitInitiationAndSettlement = 64;
    static UpdateEmployeesPersonalDetails = 65;
    static EmployeeEducationDetails = 66;
    static EmployeePreviousExperience = 67;
    static OrgLocation = 70;
    static IncomeTaxRegime = 71;
    static WorkFromHomeRequest = 72;
    static GeoLocations = 73;
    static EmployeeGeoLocations = 74;
    static LWFOverride = 75;
    static EmployeeGroupTypeAssignment = 77;
    static Objectives = 78;
    static ShiftAllowanceAdjustment = 80;
    static TemplateTask = 79;
    static ProjectPhasesTasksAndMilestone = 81;
    static ObjectiveKeyResults = 82;
    static EarnedLeave = 88;
    static OvertimeAssignment = 89;
    static SalaryOnHold = 90;
    static PaymentOnHold = 91;
    static PreviousYearConsumedLeave = 93;
    static ExitedEmployees = 94;
    static RateCardImport = 95;
    static BulkUpdateProjects = 96;
    static UpdateProjectTasks = 97;
    static PreviousYearCarryoverImport = 99;
    static BulkUpdateAssetId = 100;
    static TimelineEvents = 101;
    static JobFunctions = 102;
    static AssignJobFunctions = 103;
    static AssignEmployeeJobFunctions = 104;
    static BulkUpdateProjectManagers = 105;
    static ClientsBillingRoles = 106;
    static ClientRateCard = 107;
    static PreviousYearAvailableLeaveBalanceImport = 108;
    static BulkAddAssetCategoriesAndTypes = 110;
    static AddEmployeesToReviewGroup = 111;
    static AddEmployeesToReviewCycle = 112;
    static EmployeeNumber = 113;
    static AddEmployeeSkills = 114;
    static ReviewSalaryIncrementPercentage = 115;
    static Opportunities = 116;
    static TimeFrames = 117;
    static MetricUnits = 118;
    static ObjectiveTags = 119;
    static FileUploadRequest = 120;
    static ObjectiveKeyResultTask = 121;
    static Skills = 122;
    static ReviewCycleSettings = 123;
    static ReviewGroupCycle = 124;
    static AddReviewGroupEmployees = 125;
    static ReviewQuestionSettings = 126;
    static ReviewQuestionwiseRatings = 127;
    static ReviewGoalWiseRatings = 128;
    static ReviewCompetencyWiseRatings = 129;
    static ReviewCoreValueWiseRatings = 130;
    static ReviewFinalRatings = 131;
    static CoreValues = 132;
    static ResourceCost = 133;
    static ReviewNomination = 136;
    static AirTicketAssignment = 134;
    static SocialInsuranceOverride = 135;
    static MyTeamAttendanceTimeAssignments = 137;
    static ResourceAvailabilityImport = 138;
    static HeadCountPlan = 139;
    static CareerTrackAssignment = 140;
    static EmployeeTimesheetEntriesImport = 141;
    static TimesheetEntriesImport = 142;
    static PreboardingCandidates = 500;
    static RevenueRecognitionImport = 145;
    static ResourceTargetUtilizationImport = 143;
    static BulkUpdateProjectResources = 144;   
    static SkillCategory = 146;  
    static BulkUpdateSkillRatings = 147;
    static ObjectiveProgress = 152;  

    static 0 = 'None';
    static 1 = 'AddEmployeesPersonalDetails';
    static 2 = 'EmployeeCurrentSalary';
    static 3 = 'Holidays';
    static 4 = 'LeaveSummary';
    static 5 = 'Loans';
    static 6 = 'CarryoverBalance';
    static 7 = 'Assets';
    static 8 = 'JobDetails';
    static 9 = 'EmployerPreviousSalary';
    static 10 = 'Bonuses';
    static 11 = 'EmployeeEffectiveSalary';
    static 12 = 'LossOfDays';
    static 13 = 'Financial';
    static 14 = 'Declaration';
    static 15 = 'EffectiveBonuses';
    static 16 = 'TDSOverride';
    static 17 = 'EmployeeCurrentSalaryWithStructureType';
    static 18 = 'ComponentsOverride';
    static 19 = 'PFOverride';
    static 20 = 'PFAndESIDetails';
    static 21 = 'LeaveRequests';
    static 22 = 'ComponentAccrual';
    static 23 = 'Projects';
    static 24 = 'ProjectTasks';
    static 25 = 'EmployeeBasicDetails';
    static 26 = 'ComponentClaim';
    static 27 = 'ProjectResources';
    static 28 = 'EmployeeEffectiveSalaryWithoutPayroll';
    static 29 = 'OneTimePayments';
    static 30 = 'OneTimeDeductions';
    static 31 = 'EmployeeModules';
    static 32 = 'ESIOverride';
    static 33 = 'PTOverride';
    static 34 = 'BonusesWithAction';
    static 35 = 'Department';
    static 36 = 'Perks';
    static 37 = 'TimesheetRepositoryTask';
    static 38 = 'EmployeePmsDetails';
    static 39 = 'PMSCompetenciesDetails';
    static 40 = 'PMSCompetenciesBehaviourDetails';
    static 41 = 'EmployeeGoalImports';
    static 42 = 'PayGroupAssignment';
    static 43 = 'PreviousComponentClaim';
    static 44 = 'AttendanceLogs';
    static 45 = 'EmployeeProfileCustomFields';
    static 46 = 'AttendanceTimeAssignments';
    static 47 = 'AssetWithCustomField';
    static 48 = 'LeaveAvailableBalance';
    static 49 = 'PayableUnitsOverride';
    static 50 = 'ShiftBoardAssignments';
    static 51 = 'PMSBulkCalibrationImport';
    static 52 = 'OvertimeAdjustedAmount';
    static 53 = 'LopReversalDays';
    static 54 = 'LetterTemplateCustomFields';
    static 55 = 'EmployeePasswordGeneration';
    static 56 = 'EmployeeEmailUpdate';
    static 58 = 'PayrollStatus';
    static 59 = 'EmployeeProfessionalSummary';
    static 60 = 'EmployeeRelations';
    static 61 = 'EmployeeAddress';
    static 62 = 'EmployeeExitInitiation';
    static 63 = 'EmployeeExitSettlement';
    static 64 = 'EmployeeExitInitiationAndSettlement';
    static 65 = 'UpdateEmployeesPersonalDetails';
    static 66 = 'EmployeeEducationDetails';
    static 67 = 'EmployeePreviousExperience';
    static 70 = 'OrgLocation';
    static 71 = 'IncomeTaxRegime';
    static 72 = 'WorkFromHomeRequests';
    static 73 = 'GeoLocations';
    static 74 = 'EmployeeGeoLocations';
    static 75 = 'LWFOverride';
    static 77 = 'EmployeeGroupTypeAssignmentImport';
    static 78 = 'Objectives';
    static 80 = 'ShiftAllowanceAdjustment';
    static 79 = 'TemplateTask';
    static 81 = 'ProjectPhasesTasksAndMilestone';
    static 82 = 'ObjectiveKeyResults';
    static 88 = 'EarnedLeave';
    static 89 = 'OvertimeAssignment';
    static 90 = 'SalaryOnHold';
    static 91 = 'PaymentOnHold';
    static 93 = 'PreviousYearConsumedLeave';
    static 94 = 'ExitedEmployees'
    static 95 = 'RateCardImport';
    static 96 = 'BulkUpdateProjects';
    static 97 = 'UpdateProjectTasks';
    static 99 = 'PreviousYearCarryoverImport';
    static 100 = 'BulkUpdateAssetId';
    static 101 = 'TimelineEvents';
    static 102 = 'JobFunctions';
    static 103 = 'AssignJobFunctions';
    static 104 = 'AssignEmployeeJobFunctions';
    static 105 = 'BulkUpdateProjectManagers';
    static 106 = 'ClientsBillingRoles';
    static 107 = 'ClientRateCard';
    static 108 = 'PreviousYearAvailableLeaveBalanceImport';
    static 110 = 'BulkAddAssetCategoriesAndTypes';
    static 111 = 'AddEmployeesToReviewGroup';
    static 112 = 'AddEmployeesToReviewCycle';
    static 113 = 'EmployeeNumber';
    static 114 = 'AddEmployeeSkills';
    static 115 = 'ReviewSalaryIncrementPercentage';
    static 116 = 'Opportunities';
    static 117 = 'TimeFrames';
    static 118 = 'Metric Units';
    static 119 = 'Objective Tags';
    static 120 = 'FileUploadRequest';
    static 121 = 'Objective KeyResult Task';
    static 122 = 'Skills';
    static 123 = 'ReviewCycleSettings';
    static 124 = 'ReviewGroupCycle';
    static 125 = 'AddReviewCycleEmployees';
    static 126 = 'ReviewQuestionSettings';
    static 127 = 'ReviewQuestionwiseRatings';
    static 128 = 'ReviewGoalWiseRatings';
    static 129 = 'ReviewCompetencyWiseRatings';
    static 130 = 'ReviewCoreValueWiseRatings';
    static 131 = 'ReviewFinalRatings';
    static 132 = 'CoreValues';
    static 133 = 'ResourceCost';
    static 136 = 'BulkNominateReviewers';
    static 134 = 'AirTicketAssignment';
    static 135 = 'SocialInsuranceOverride';
    static 137 = 'MyTeamAttendanceTimeAssignments';
    static 139 = 'HeadCountPlan';
    static 140 = 'CareerTrackAssignment';
    static 141 = 'EmployeeTimesheetEntriesImport';
    static 142 = 'TimesheetEntriesImport';
    static 143 = 'BulkUpdateProjectResources';
    static 144 = 'ResourceTargetUtilizationImport';
    static 146 = 'SkillCategory';
    static 147 = 'BulkUpdateSkillRatings';
    static 500 = 'PreboardingCandidates';
    static 145 = 'RevenueRecognitionImport';
    static 152 = 'ObjectiveProgress';
}

export class ExcelImportGroup extends Enum {
    static None = 0;
    static Employees = 1;
    static Attendance = 2;
    static Assets = 3;
    static Leaves = 4;
    static PMS = 5;
    static ShiftBoard = 6;
    static PasswordGeneration = 7;
    static Email = 8;
    static Holidays = 9;
    static Payroll = 10;
    static EmployeeProfile = 11;
    static Documents = 12;
    static Location = 20;
    static Timesheet = 21;
    static PreboardingCandidates = 500;
    static MyTeamAttendance = 22;
    static HeadCountPlan = 23;

    static 0 = 'None';
    static 1 = 'Employees';
    static 2 = 'Attendance';
    static 3 = 'Assets';
    static 4 = 'Leaves';
    static 5 = 'PMS';
    static 6 = 'ShiftBoard';
    static 7 = 'PasswordGeneration';
    static 8 = 'Email';
    static 9 = 'Holidays';
    static 10 = 'Payroll';
    static 11 = 'EmployeeProfile';
    static 12 = 'Documents';
    static 20 = 'Location';
    static 21 = 'Timesheet';
    static 500 = 'PreboardingCandidates';
    static 22 = 'MyTeamAttendance';
    static 23 = 'HeadCountPlan';
}

export class ImportFilterType extends Enum {
    static DateOfJoining = 0;
    static JobTitle = 1;
    static Department = 2;
    static BusinessUnit = 3;
    static Location = 4;
    static CostCenter = 5;
    static PayGrade = 6;
    static PayGroup = 7;
    static Client = 8;
    static Project = 9;

    static 0 = 'Date Of Joining';
    static 1 = 'Job Title';
    static 2 = 'Department';
    static 3 = 'Business Unit';
    static 4 = 'Location';
    static 5 = 'Cost Center';
    static 6 = 'Pay Grade';
    static 7 = 'Pay Group';
    static 8 = 'Client';
    static 9 = 'Project';
}

export enum FilterType {
    MultiSelect = 0,
    SingleSelect = 1,
    DateRange = 2,
    DatePicker = 3,
    InputDropdown = 4,
    Range = 5
}

export enum PenalisationPolicyTiles {
    BasicInformation = 0,
    NoAttendance = 1,
    LateArrival = 2,
    WorkHours = 3,
    MissingLogs = 4,
}
