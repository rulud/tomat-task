import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskCreatorComponent} from './task-creator/task-creator.component';
import {TaskExecutionComponent} from './task-execution/task-execution.component';

const routes: Routes = [
    { path: '', component: TaskCreatorComponent},
    { path: 'execution', component: TaskExecutionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
