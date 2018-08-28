import { EventEmitter } from "@angular/core";
import { WebAppName } from "../../shared/models/cache/webappname";
import { hubConnection } from 'signalr-no-jquery';

export class HUbData { loc: boolean; srv: string; }

export class SignalRService {
    private proxy: any;
    private connection: any;
    public messageReceived: EventEmitter<HUbData>;
    constructor() {
        this.connection = hubConnection(WebAppName.DomainSignalr);
        this.proxy = this.connection.createHubProxy('EventChatHub');
        this.proxy.on('newChatMessageReceived', (data: any) => {
            this.messageReceived.emit({ loc: true, srv: data });
        });
    }
    public sub(call) {
        this.messageReceived = new EventEmitter<HUbData>();
        this.messageReceived.subscribe(x => { call(x) });
        this.connection.start().done((data: any) => {
            this.messageReceived.emit({ loc: true, srv: ""});
        }).fail((error: any) => {
            this.messageReceived.emit({ loc: false, srv: "" });
        });
    }    
    public SerInvokeSubscribe(...args: string[]) {
        this.proxy.invoke("Subscribe", ...args);
    }
    public SerInvokeSendALL(...args: string[]) {
        this.proxy.invoke("SendALL", ...args);
    }
    public SerInvokeSendBy(...args: string[]) {
        this.proxy.invoke("SendBy", ...args);
    }
    public SerInvokeSendBot(...args: string[]) {
        this.proxy.invoke("SendBot", ...args);
    }
}  