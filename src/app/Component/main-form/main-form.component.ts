import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskItems } from '../../Services/task-model';  // Görev modelini import ettik
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Model } from '../../Services/task-model';
import { TaskService } from '../../Services/task-services';

@Component({
  selector: 'app-main-form',
  standalone: true,
  imports: [TableModule, CheckboxModule, ButtonModule, CommonModule, FormsModule],
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css'],
  providers: [DatePipe]
})
export class MainFormComponent implements OnInit {
  
  model: Model = new Model();
  navigateToAddTask() {
    this.router.navigate(['/task-add']); // Görev ekleme sayfasına yönlendiriyoruz
  }

  tasks: TaskItems[] = [];

  constructor(private router: Router, private taskService: TaskService, private datePipe: DatePipe) 
  { this.model.items.push(new TaskItems(1, 'Görev 1', 'Açıklama 1', new Date(), true, new Date('2024-12-31')));
  }

  ngOnInit() {
    // Sayfa yüklendiğinde görevleri alıyoruz
    this.tasks = this.taskService.getTasks();
  }
  // Verileri TaskService'ten alıyoruz
  loadTasks() {
    this.tasks = this.taskService.getTasks();
  }

  // Görev durumunu değiştirme
  toggleTaskStatus(task: TaskItems) {
    task.status = !task.status;
    this.taskService.addTask(task); // Durumu güncelliyoruz
  }

  // Görev silme
  deleteTask(task: TaskItems) {
    this.taskService.removeTask(task.id); // Görevi servisten sil
    this.tasks = this.taskService.getTasks(); // Güncellenmiş görev listesini çek
}

  
removeTask(taskId: number): void {
  this.taskService.removeTask(taskId);
  this.tasks = this.taskService.getTasks(); // Güncellenen listeyi çek
}


  // Tarih formatlama
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
  
}
