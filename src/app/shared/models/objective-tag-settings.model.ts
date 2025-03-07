export class ObjectiveTagSettings {
    areObjectiveTagsEnabled: boolean;
    canEmployeeCreateTags: boolean;
    areEmployeeTagsVisible: boolean;
    tagAlias: string;

    constructor(args) {
        this.areObjectiveTagsEnabled = args.areObjectiveTagsEnabled;
        this.canEmployeeCreateTags = args.canEmployeeCreateTags;
        this.areEmployeeTagsVisible = args.areEmployeeTagsVisible;
        this.tagAlias = args.tagAlias;
    }
}
