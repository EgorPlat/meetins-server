export class CreateMeetingDto {
    readonly participants: string[];
    readonly date: Date;
    readonly description: string;
    readonly goal: string;
    readonly title: string;
    readonly address: string;
}