import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface Tasks {
    name: any;
    tomatos: number;
}


@Injectable({
    providedIn: 'root'
})

export class TaskCreatorService {

    public tasks$ = new BehaviorSubject([]);

    constructor() {}

    addTask(task: any) {
        task.tomatos = 0;
        this.tasks$.next(this.tasks$.getValue().concat([task]));
    }

    addTomatToTask(taskNumber: any) {
        const taskArr = this.tasks$.getValue();
        taskArr[taskNumber].tomatos++;
        this.tasks$.next(taskArr);
    }

    deleteTask(task: any) {
        const taskArr: any[] = this.tasks$.getValue();
        taskArr.forEach((item, index) => {
            if (item === task) { taskArr.splice(index, 1); }
        });
        this.tasks$.next(taskArr);
    }
}
