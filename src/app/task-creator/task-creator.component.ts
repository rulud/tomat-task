import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaskCreatorService} from './task-creator.service';

@Component({
    selector: 'app-task-creator',
    template: `
        <div class="row">
            <div class="col-12">
                <form [formGroup]="form" class="input-group mb-2 mt-2">
                    <input type="text" formControlName="name" placeholder="Задача" class="form-control"/>
                    <div class="input-group-append">
                        <span class="input-group-text btn" (click)="addTask()">Добавить задачу</span>
                    </div>
                </form>
            </div>
            <table class="table table-striped">
                <tbody>
                <tr *ngFor="let task of tasks; index as i">
                    <td>
                        <p class="float-left">{{ task.name }}</p>
                        <button class="btn btn-danger float-right" (click)="onDelete(task)">X</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="col-12" *ngIf="tasks.length">
            <div class="btn btn-success" routerLink="/execution">Готово</div>
        </div>
    `,
})
export class TaskCreatorComponent implements OnInit {

    form: FormGroup;
    tasks: any;

    constructor(
        private fb: FormBuilder,
        private taskCreatorService: TaskCreatorService,
    ) {
    }

    ngOnInit() {
        this.taskCreatorService.tasks$.subscribe(v => this.tasks = v);
        this.form = this.fb.group({
            name: ['', [Validators.required]],
        });

    }

    addTask() {
        console.log(this.form.value);
        this.taskCreatorService.addTask(this.form.value);
        this.form.get('name').setValue('');
    }

    onDelete(task) {
        this.taskCreatorService.deleteTask(task);
    }
}
