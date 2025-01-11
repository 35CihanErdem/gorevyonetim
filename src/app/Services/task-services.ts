import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TaskItems } from './task-model';
import { isPlatformBrowser } from '@angular/common';
import { setFlagsFromString } from 'node:v8';
import { kill } from 'node:process';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: TaskItems[] = [];
  selectedTask: TaskItems | null = null; // Seçilen görev

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      const storedTasks = localStorage.getItem('tasks');
      this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
      this.loadTaskStatuses(); // LocalStorage'dan görev durumlarını yükle
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
    this.removeTaskStatus(taskId); // Görev silindiğinde durumunu da temizle
  }

  // Görev güncelleme
  updateTask(task: TaskItems): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
      this.updateLocalStorage();
      this.saveTaskStatus(task.id, task.status); // Durumu kaydet
    }
  }

  // Görev durumunu kaydetme
  saveTaskStatus(taskId: number, status: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      const statuses = JSON.parse(localStorage.getItem('taskStatuses') || '{}');
      statuses[taskId] = status;
      localStorage.setItem('taskStatuses', JSON.stringify(statuses));
    }
  }

  // Görev durumlarını yükleme
  loadTaskStatuses(): void {
    if (isPlatformBrowser(this.platformId)) {
      const statuses = JSON.parse(localStorage.getItem('taskStatuses') || '{}');
      this.tasks.forEach(task => {
        if (statuses[task.id] !== undefined) {
          task.status = statuses[task.id];
        }
      });
    }
  }

  

  // Görev durumunu silme
  removeTaskStatus(taskId: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const statuses = JSON.parse(localStorage.getItem('taskStatuses') || '{}');
      delete statuses[taskId];
      localStorage.setItem('taskStatuses', JSON.stringify(statuses));
    }
  }

 

  // localStorage güncelleme
  private updateLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
}
