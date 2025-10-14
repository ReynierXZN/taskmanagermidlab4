import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-filter.component.html',
})
export class TaskFilterComponent {
  activeFilter: 'all' | 'active' | 'completed' = 'all'; // ✅ added line

  constructor(private taskService: TaskService) {}

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.taskService.setFilter(filter);
    this.activeFilter = filter; // ✅ added line to highlight clicked button
  }
}