import { Component, ViewChild } from '@angular/core';
import { Content, TextInput } from 'ionic-angular';
import { SignalRService, HUbData } from '../../pages/chat/signalrservice';
import { Utils } from 'oneheart-core';


export class ChatMessage {
    messageId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    toUserId: string;
    time: number | string;
    message: string;
    status: string;
}

export class UserInfo {
    id: string;
    name?: string;
    avatar?: string;
}
@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
})
export class Chat {
    @ViewChild(Content) content: Content;
    @ViewChild('chat_input') messageInput: TextInput;
    msgList: ChatMessage[] = [];
    user: UserInfo;
    toUser: UserInfo;
    editorMsg = '';
    showEmojiPicker = false;
    connectOk = false;
    constructor(public chatsrv:SignalRService) {
        this.toUser = { id: "00000002", name: "试测", avatar: "assets/img/appicon-svg.png" };
        this.user = { id: "00000001", name: "测试", avatar: "assets/img/appicon.png" };        
    }

    ionViewDidEnter() {
        this.connectOk = false;        
        this.chatsrv.sub((data: HUbData) => {
            this.HUBEmitData(data);
        })
    }

    onFocus() {
        this.showEmojiPicker = false;
        this.content.resize();
        this.scrollToBottom();
    }

    switchEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
        if (!this.showEmojiPicker) {
            this.messageInput.setFocus();
        }
        this.content.resize();
        this.scrollToBottom();
    }

    sendMsg() {
        if (!this.connectOk) return;
        if (!this.editorMsg.trim()) return;
        const id = Date.now().toString();
        let newMsg: ChatMessage = {
            messageId: Date.now().toString(),
            userId: this.user.id,
            userName: this.user.name,
            userAvatar: this.user.avatar,
            toUserId: this.toUser.id,
            time: Date.now(),
            message: this.editorMsg,
            status: 'pending'
        };

        this.pushNewMsg(newMsg, false);
        this.editorMsg = '';
        if (!this.showEmojiPicker) {
            this.messageInput.setFocus();
        }
        this.chatsrv.SerInvokeSendBot(JSON.stringify(newMsg));
        Utils.log("signalr Invoke ",newMsg);
    }
    HUBEmitData(data: HUbData) {
        Utils.log("signalr data ",data)
        this.connectOk = data.loc;
        if (data.loc && data.srv) {
            this.pushNewMsg(JSON.parse(data.srv), true);
        }
    }
    pushNewMsg(msg: ChatMessage, locSrv: boolean) {
        const userId = this.user.id, toUserId = this.toUser.id;
        if (locSrv) msg.status = "succ";
        if (msg.userId === userId && msg.toUserId === toUserId) {
            Chat.Msglist.push(msg);
        } else if (msg.toUserId === userId && msg.userId === toUserId) {
            Chat.Msglist.push(msg);
        }
        this.msgList =Chat.Msglist;
        this.scrollToBottom();
    }

    getMsgIndexById(id: string) { return this.msgList.findIndex(e => e.messageId === id) }

    scrollToBottom() { setTimeout(() => { if (this.content.scrollToBottom) { this.content.scrollToBottom(); } }, 400) }

    static Msglist=[];
}
