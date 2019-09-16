import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {StateManager} from './state-manager/manager';
import * as states from './state-manager/states';

@Injectable({
    providedIn: 'root'
})
export class TimerService {

    public seconds$ = new BehaviorSubject(0);
    public state$ = new BehaviorSubject(null);
    public numberTaskProcess$ = new BehaviorSubject(0);

    private timerLoop: any = null;
    private processParams = {
        processInfo: {limitTask: 0, numberTaskProcess: 0, counter: 0, isNeedStartNextTask: false},
        seconds: 0,
        seconds$: this.seconds$,
        timerLoop: this.timerLoop,
    };

    constructor() {
    }

    resetVar() {
        this.seconds$.next(0);
        this.state$.next(null);
        this.numberTaskProcess$.next(0);

        clearInterval(this.processParams.timerLoop);
        this.processParams = {
            processInfo: {limitTask: 0, numberTaskProcess: 0, counter: 0, isNeedStartNextTask: false},
            seconds: 0,
            seconds$: this.seconds$,
            timerLoop: this.timerLoop,
        };
    }

    start(countTask) {
        this.resetVar();
        this.processParams.processInfo.limitTask = countTask - 1;
        const sm = new StateManager(states.STATE_TASK, this.processParams, this.state$);
        this.numberTaskProcess$.next(this.processParams.processInfo.numberTaskProcess);
        this.startTimerLoop(sm);
    }

    startNextTask() {
        this.processParams.processInfo.isNeedStartNextTask = true;
    }

    private startTimerLoop(sm) {
        this.processParams.timerLoop = setInterval(() => {
            const second = this.seconds$.value - 1;
            if (second >= 0) {
                this.seconds$.next(second);
            } else {
                sm.transit(this.processParams);
                this.numberTaskProcess$.next(this.processParams.processInfo.numberTaskProcess);
            }
        }, 1000);
    }
}
