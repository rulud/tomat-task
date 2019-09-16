import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TimePipe} from './time.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import { TaskExecutionComponent } from './task-execution/task-execution.component';
import { TaskCreatorComponent } from './task-creator/task-creator.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    TimePipe,
    TaskExecutionComponent,
    TaskCreatorComponent
  ],
  imports: [
    BrowserModule,
      ReactiveFormsModule,
      NgbModule,
      AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
