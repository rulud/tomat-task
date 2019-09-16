import {Component, OnInit} from '@angular/core';
import {TimerService} from './timer.service';
import {TaskCreatorService} from '../task-creator/task-creator.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-task-execution',
    templateUrl: './task-execution.component.html',
    providers: [TimerService]
})
export class TaskExecutionComponent implements OnInit {
    state = null;
    tasks = [];
    activeTaskNumber = 1;

    showInfo = false;

    constructor(
        private timerService: TimerService,
        private taskCreatorService: TaskCreatorService,
        private router: Router
    ) {
        if (!this.taskCreatorService.tasks$.value.length) {
            router.navigate(['']); // ��� �����, ��������� �� ��������
        }
    }

    start() {
        this.timerService.start(this.tasks.length);
    }

    startNextTask() {
        this.timerService.startNextTask();
        this.showInfo = true;
    }

    // �������� ����� ��� �������
    skip() {
        this.timerService.seconds$.next(1);
    }

    ngOnInit() {
        this.taskCreatorService.tasks$.subscribe(v => this.tasks = v);
        this.timerService.numberTaskProcess$.subscribe(
            v => {
                this.activeTaskNumber = v;
                if (this.timerService.state$.value === 'TASK') {
                    this.taskCreatorService.addTomatToTask(this.activeTaskNumber);
                }
            }
        );
        this.timerService.state$.subscribe(
            (v) => {
                this.showInfo = false;
                this.state = v;
            }
        );
    }

}
