import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks$: Observable<Task[]>;
  editingTaskId: number | null = null;
  editedDescription: string = '';
  newTaskDescription: string = ''; // ✅ added

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.filteredTasks$;
  }

  // ✅ add new task
  addTask() {
    if (this.newTaskDescription.trim()) {
      this.taskService.addTask(this.newTaskDescription);
      this.newTaskDescription = ''; // clear input
    }
  }

  toggleCompletion(id: number) {
    this.taskService.toggleTaskCompletion(id);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  startEditing(task: Task) {
    this.editingTaskId = task.id;
    this.editedDescription = task.description;
  }

  saveEdit(task: Task) {
    if (this.editedDescription.trim()) {
      this.taskService.editTask(task.id, this.editedDescription);
    }
    this.editingTaskId = null;
  }

  cancelEdit() {
    this.editingTaskId = null;
  }
}