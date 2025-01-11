import { Component, model, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Model, TaskItems } from '../../Services/task-model';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../Services/task-services';
import { TableComponent } from "../table/table.component";

@Component({
  selector: 'app-main-form',
  standalone: true,
  imports: [TableModule, CheckboxModule, ButtonModule, CommonModule, FormsModule, TableComponent],
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css'],
  providers: [DatePipe,Model]
})
export class MainFormComponent implements OnInit {
  tasks: TaskItems[] = [];
  filteredTasks: TaskItems[] = []; // Filtrelenmiş görevler
  selectedTask: TaskItems | null = null; 

  constructor(private router: Router, private taskService: TaskService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.tasks = this.taskService.getTasks(); // Görevleri servisten alıyoruz
    this.filteredTasks = [...this.tasks]; 
 
    
  }

  // Görev durumunu değiştirme
toggleTaskStatus(task: TaskItems) {
  task.status = !task.status; // Durumu tersine çevir
  this.taskService.saveTaskStatus(task.id, task.status); // Durumu kaydet
}

  // Görev ekleme sayfasına yönlendirme
  navigateToAddTask() {
    this.router.navigate(['/task-add']);
  }

  // Görev düzenleme
  editTask(task: TaskItems) {
    this.taskService.selectedTask = { ...task }; 
    this.router.navigate(['/task-edit']);
  }

  // Görev silme
  deleteTask(task: TaskItems) {
    this.taskService.removeTask(task.id); // Görevi servisten sil
    this.loadTasks(); // Listeyi yeniden yükle
  }

  // Görevleri yeniden yükleyip filtreliyoruz
  loadTasks() {
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = [...this.tasks]; // Başlangıçta tüm görevler gösterilsin
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  // Tamamlanan görevleri filtrele
  filterCompletedTasks() {
    this.filteredTasks = this.tasks.filter(task => task.status);
  }

  // Tamamlanmayan görevleri filtrele
  filterIncompleteTasks() {
    this.filteredTasks = this.tasks.filter(task => !task.status);
  }

  // Tarihe göre sıralama
  sortByDate() {
    this.filteredTasks = [...this.filteredTasks].sort((a, b) => {
      return a.endDate.getTime() - b.endDate.getTime(); // Bitirme tarihine göre sıralama
    });
  }
  
  
}
