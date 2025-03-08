export class ScheduleMeetingView {
    subject: string;
    startTime: Date;
    endTime: Date;
    attendees: Array<string>;

    constructor(args) {
        this.subject = args?.subject ?? '';
        this.startTime = args?.startTime ?? new Date();
        this.endTime = new Date(this.startTime.getTime() + 30 * 60000);
        this.attendees = args?.attendees || [];
    }
}