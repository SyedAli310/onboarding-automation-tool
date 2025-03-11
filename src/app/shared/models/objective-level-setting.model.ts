import { ObjectiveManagerType, SystemGroupType } from './enums';

export class ObjectiveLevelSettings {
    companyObjectivesConfig: ObjectiveLevelConfig;
    individualObjectivesConfig: IndividualObjectiveLevelConfig;
    groupObjectivesConfig: Array<GroupObjectiveLevelConfig>;

    constructor(args) {
        this.companyObjectivesConfig = args.companyObjectivesConfig || new ObjectiveLevelConfig({});
        this.individualObjectivesConfig = args.individualObjectivesConfig || new IndividualObjectiveLevelConfig({});
        this.groupObjectivesConfig = args.groupObjectivesConfig || [new GroupObjectiveLevelConfig({})];
    }
}

export class ObjectiveLevelConfig {
    isEnabled: boolean;
    isVisibleToEveryone: boolean;
    canManageSelfObjectives: boolean;
    managers: Array<ObjectiveManager>;

    constructor(args) {
        this.isEnabled = args?.isEnabled ?? false;
        this.isVisibleToEveryone = args?.isVisibleToEveryone ?? false;
        this.canManageSelfObjectives = args.canManageSelfObjectives;
        this.managers = args?.managers ?? [];
    }
}

export class IndividualObjectiveLevelConfig extends ObjectiveLevelConfig {
    
}

export class GroupObjectiveLevelConfig extends ObjectiveLevelConfig {
    systemGroupType: SystemGroupType;

    constructor(args) {
        super(args);
        this.systemGroupType = args.systemGroupType;
    }
}

export class ObjectiveManager {
    objectiveManagerType: ObjectiveManagerType;
    managerName: string;
    managerId: number;
    managerProfileImageUrl: string;

    constructor(args) {
        this.objectiveManagerType = args.objectiveManagerType;
        this.managerName = args.managerName;
        this.managerId = args.managerId;
        this.managerProfileImageUrl = args.managerProfileImageUrl;
    }
}
