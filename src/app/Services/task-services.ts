import { Injectable } from '@angular/core';
import { TaskItems } from './task-model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: TaskItems[] = [];
  constructor() {
    const tasksData = localStorage.getItem('tasks');
    if (tasksData) {
        this.tasks = JSON.parse(tasksData);
    }
}

  // Görevleri yerel depolamadan yükle
  private loadTasks(): void {
    const tasksData = localStorage.getItem('tasks'); // LocalStorage'dan veriyi al
    if (tasksData) {
      this.tasks = JSON.parse(tasksData); // JSON'u nesneye çevir
    } else {
      this.tasks = []; // Eğer veri yoksa boş bir dizi başlat
    }
  }

  // Tüm görevleri al
  getTasks(): TaskItems[] {
    return this.tasks;
}


  addTask(task: TaskItems): void {
    this.tasks.push(task);
    this.updateLocalStorage();
}

removeTask(taskId: number): void {
  this.tasks = this.tasks.filter(task => task.id !== taskId); 
  this.updateLocalStorage(); // Silinmiş listeyi kaydet
}

  // LocalStorage'a görevleri güncelle
  private updateLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
}
updateTasks(tasks: TaskItems[]): void {
  this.tasks = tasks;
  this.updateLocalStorage(); // Güncel görev listemizi localStorage'a kaydediyoruz
}

}
