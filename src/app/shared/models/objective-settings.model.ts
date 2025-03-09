import { Frequency, GoalStatus, GoalTerminology, ObjectiveUpdateFrequency, WeightageType } from './enums';
import { ObjectiveApprovalSettings } from './objective-approval-settings.model';
import { ObjectiveLevelSettings } from './objective-level-setting.model';
import { ObjectiveTagSettings } from './objective-tag-settings.model';

export class ObjectiveSettings {
    id: number;
    isModernOKR: boolean;
    objectiveWeightageType: WeightageType;
    useKeyResults: boolean;
    isKeyResultsMandatory: boolean;
    canUpdateObjectiveProgress: boolean;
    keyResultsWeightageType: WeightageType;
    isWeightageMandatory: boolean;
    maxObjectivesPerIndividual: number;
    minObjectivesPerIndividual: number;
    allowObjectivePriorities: boolean;
    objectiveLevelSettings: ObjectiveLevelSettings;
    isGoalSystemUpgraded: boolean;
    objectiveAlias: string;
    objectiveAliasPlural: string;
    keyResultAlias: string;
    keyResultAliasPlural: string;
    initiativeAlias: string;
    initiativeAliasPlural: string;
    timeFrameFrequencies: Array<Frequency>;
    updateFrequency: ObjectiveUpdateFrequency;
    cycleStartMonth: number;
    tagSettings: ObjectiveTagSettings;
    isSetupCompleted: boolean;
    objectiveApprovalSettings: ObjectiveApprovalSettings;
    goalTerminology: GoalTerminology;
    isAlignmentEnabled: boolean;
    isRollupEnabled: boolean;
    autoCloseTimeFrames: boolean;
    objectiveStatusRanges: Array<ObjectiveRanges> = [];
    useInitiatives: boolean; 

    constructor(args) {
        this.id = args.id;
        this.isModernOKR = args.isModernOKR;
        this.objectiveWeightageType = args.objectiveWeightageType;
        this.isWeightageMandatory = args.isWeightageMandatory;
        this.useKeyResults = args.useKeyResults;
        this.isKeyResultsMandatory = args.isKeyResultsMandatory;
        this.canUpdateObjectiveProgress = !this.useKeyResults || args.canUpdateObjectiveProgress;
        this.keyResultsWeightageType = args.keyResultsWeightageType;
        this.maxObjectivesPerIndividual = +args?.maxObjectivesPerIndividual || 0;
        this.minObjectivesPerIndividual = +args?.minObjectivesPerIndividual || 0;
        this.allowObjectivePriorities = args.allowObjectivePriorities;
        this.objectiveLevelSettings = args.objectiveLevelSettings || new ObjectiveLevelSettings({});
        this.isGoalSystemUpgraded = args.isGoalSystemUpgraded;
        this.objectiveAlias = args.objectiveAlias || 'Objective';
        this.objectiveAliasPlural = args.objectiveAliasPlural || this.objectiveAlias + 's';
        this.keyResultAlias = args.keyResultAlias || 'Key Result';
        this.keyResultAliasPlural = args.keyResultAliasPlural || this.keyResultAlias + 's';
        this.initiativeAlias = args.initiativeAlias || 'Task';
        this.initiativeAliasPlural = args.initiativeAliasPlural || this.initiativeAlias + 's';
        this.cycleStartMonth = args.cycleStartMonth;
        this.tagSettings = args.tagSettings || new ObjectiveTagSettings({});
        this.isSetupCompleted = args.isSetupCompleted;
        this.objectiveApprovalSettings = args.objectiveApprovalSettings || new ObjectiveApprovalSettings({});
        this.goalTerminology = args.goalTerminology || GoalTerminology.Goal;
        this.isAlignmentEnabled = args.isAlignmentEnabled;
        this.isRollupEnabled = args.isRollupEnabled;
        this.timeFrameFrequencies = args.timeFrameFrequencies || [];
        this.updateFrequency = args.updateFrequency || 0;
        this.autoCloseTimeFrames = args.autoCloseTimeFrames;
        this.setRanges(args.objectiveStatusRanges);
        this.useInitiatives = args.useInitiatives
    }

    get areIndividualObjectivesPublic() {
        return this.objectiveLevelSettings.individualObjectivesConfig.isVisibleToEveryone;
    }

    get isAnyObjectiveLevelPublic() {
        return this.objectiveLevelSettings.individualObjectivesConfig.isVisibleToEveryone
            || this.objectiveLevelSettings.groupObjectivesConfig[0].isVisibleToEveryone
            || this.objectiveLevelSettings.companyObjectivesConfig.isVisibleToEveryone;
    }

    get isAnyObjectiveApprovalEnabled() {
        return this.objectiveApprovalSettings.individualLevelApprovalSettings.requireApproval
            || (this.objectiveApprovalSettings.groupLevelApprovalSettings.length > 0 && this.objectiveApprovalSettings.groupLevelApprovalSettings[0].requireApproval);
    }

    setRanges(statusRanges:any) {
        if (statusRanges) {
            for (const property in statusRanges) {
                var range = new ObjectiveRanges({ min: statusRanges[property], status: property });
                this.objectiveStatusRanges.push(range);
            }

            this.objectiveStatusRanges = this.objectiveStatusRanges.sort((a, b) => a.min === null ? 1 : b.min === null ? -1 : b.min - a.min);
            for (var i = 1; i < this.objectiveStatusRanges.length; i++) {
                this.objectiveStatusRanges[i].max = this.objectiveStatusRanges[i - 1].min;
            }
        }
    }
}

class ObjectiveRanges {
    min: number | null;
    max: number | null;
    status: GoalStatus;

    constructor(args) {
        this.min = args.min;
        this.max = args.max;
        this.status = args.status;
    }
}
