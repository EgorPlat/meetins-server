export interface IOuterInvites {
    invitedUsers: IInvitedUsers[],
    eventId: string
}

export interface IInvitedUsers {
    userId: string,
    status: boolean,
    dateOfSending: string,
}

export interface IInnerInvites {
    fromUserId: string,
    eventId: string,
    dateOfSending: string,
    status: boolean,
}