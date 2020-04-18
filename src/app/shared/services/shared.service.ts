import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

import { Subject, Observer } from "rxjs";
import { Observable } from "rxjs";

@Injectable()
export class DataService {

    constructor() { }

    private subject: Subject<MessageEvent>;
    private connected$ = new Subject<any>();

    public connect(url): Subject<MessageEvent> {
        if (!this.subject) {
            this.subject = this.create(url);
            console.log("Successfully connected: " + url);
            this.connected$.next(true);
        }
        return this.subject;
    }

    public connected(): Observable<any> {
        return this.connected$.asObservable();
    }

    private create(url): Subject<MessageEvent> {
        let ws = new WebSocket(url);
        let observable = Observable.create(
            (obs: Observer<MessageEvent>) => {
                ws.onmessage = obs.next.bind(obs);
                ws.onerror = obs.error.bind(obs);
                ws.onclose = obs.complete.bind(obs);
                return ws.close.bind(ws);
            })
        let observer = {
            next: (data: Object) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        }
        return Subject.create(observer, observable);
    }

}






