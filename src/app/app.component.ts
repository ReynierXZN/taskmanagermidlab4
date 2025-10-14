import { Component } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFilterComponent } from './task-filter/task-filter.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TaskListComponent, TaskFilterComponent],
  template: `
    <div class="container mt-4">
      <app-task-filter></app-task-filter>
      <app-task-list></app-task-list>
    </div>
  `
})
export class AppComponent {}