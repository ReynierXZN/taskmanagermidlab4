import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private nextId = 1;

  private currentFilter: 'all' | 'active' | 'completed' = 'all';

  // ✅ Observable for filtered tasks (this fixes the "does not exist" error)
  private filteredTasksSubject = new BehaviorSubject<Task[]>([]);
  filteredTasks$ = this.filteredTasksSubject.asObservable();

  constructor() {
    this.updateFilteredTasks();
  }

  addTask(description: string) {
    const newTask: Task = {
      id: this.nextId++,
      description,
      isCompleted: false,
      createdAt: new Date()
    };
    this.tasks.push(newTask);
    this.updateFilteredTasks();
  }

  // ✅ Matches your component now
  toggleTaskCompletion(id: number) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.isCompleted = !task.isCompleted;
      this.updateFilteredTasks();
    }
  }

  editTask(id: number, newDescription: string) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.description = newDescription;
      this.updateFilteredTasks();
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.updateFilteredTasks();
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.currentFilter = filter;
    this.updateFilteredTasks();
  }

  private updateFilteredTasks() {
    let filtered: Task[] = [];

    switch (this.currentFilter) {
      case 'active':
        filtered = this.tasks.filter(t => !t.isCompleted);
        break;
      case 'completed':
        filtered = this.tasks.filter(t => t.isCompleted);
        break;
      default:
        filtered = this.tasks;
    }

    this.filteredTasksSubject.next(filtered);
  }
}