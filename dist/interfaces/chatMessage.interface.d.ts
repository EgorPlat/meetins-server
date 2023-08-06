export interface IMessage {
    dialogId: string;
    content: string;
    messageId: string;
    sendAt: Date;
    senderId: string;
    isRead: boolean;
    avatar: string;
    senderName: string;
    status?: boolean;
    type: string;
}
