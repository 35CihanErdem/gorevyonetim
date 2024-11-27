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
  tasks: TaskItems[] = [];  // Görevler
  filteredTasks: TaskItems[] = [];  // Filtrelenmiş görevler

  constructor(private router: Router, private taskService: TaskService, private datePipe: DatePipe) { }

  ngOnInit() {
    // Sayfa yüklendiğinde görevleri alıyoruz
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks(); // Tüm görevleri servisten al
    this.filteredTasks = [...this.tasks];  // Başlangıçta tüm görevler gösterilsin
  }

  // Görev ekleme yönlendirme
  navigateToAddTask() {
    this.router.navigate(['/task-add']); // Görev ekleme sayfasına yönlendiriyoruz
  }

  // Görev durumunu değiştirme
  toggleTaskStatus(task: TaskItems) {
    task.status = !task.status;
    this.taskService.addTask(task); // Durumu güncelliyoruz
  }

  // Görev silme
  deleteTask(task: TaskItems) {
    this.taskService.removeTask(task.id); // Görevi servisten sil
    this.loadTasks(); // Güncellenmiş görev listesini çek
  }

  // Tarih formatlama
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  // Tarihe göre sıralama (ilk tarihli görev en üstte)
  sortByDate() {
    this.filteredTasks = [...this.filteredTasks].sort((a, b) => {
      return a.endDate.getTime() - b.endDate.getTime();  // Tarihe göre artan sıralama
    });
  }

  // Duruma göre sıralama (Tamamlanmış görevler üstte)
  sortByStatus() {
    this.filteredTasks = [...this.filteredTasks].sort((a, b) => {
      if (a.status === b.status) return 0;
      return a.status ? -1 : 1;  // Tamamlanmış olan görev üstte
    });
  }

  // Görevi silme (farklı fonksiyon)
  removeTask(taskId: number): void {
    this.taskService.removeTask(taskId);
    this.loadTasks(); // Güncellenen listeyi çek
  }
}