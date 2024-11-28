import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TaskItems } from './task-model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: TaskItems[] = [];
  selectedTask: TaskItems | null = null;  // Seçilen görev
  
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      const storedTasks = localStorage.getItem('tasks');
      this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
    }
  }

  // Tüm görevleri al
  getTasks(): TaskItems[] {
    return this.tasks;
  }

  // Görev ekleme
  addTask(task: TaskItems): void {
    this.tasks.push(task);
    this.updateLocalStorage();
  }

  // Görev silme
  removeTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId); 
    this.updateLocalStorage();
  }

  // Görev güncelleme
  updateTask(task: TaskItems): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
      this.updateLocalStorage();
    }
  }

  // localStorage güncelleme
  private updateLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}