import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../Services/task-services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskItems } from '../../Services/task-model';
import { CalendarModule } from 'primeng/calendar';
@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [FormsModule,CommonModule,CalendarModule],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent {
  taskName: string = '';
  taskDescription: string = '';
  endDate: Date | null = null;

  constructor(private router: Router, private taskService: TaskService) {}

  addTask() {
    if (this.taskName && this.taskDescription && this.endDate) {
      // Yeni bir görev oluşturuyoruz
      const newTask = new TaskItems(
        this.taskService.getTasks().length + 1, // Dinamik id
        this.taskName,
        this.taskDescription,
        new Date(), // Şu anki tarih
        false, // Başlangıçta görev tamamlanmadı
        this.endDate // Bitiş tarihini burada ekliyoruz
      );

      // Görevi ekliyoruz
      this.taskService.addTask(newTask);

      // Başka bir sayfaya yönlendirme yapabiliriz
      this.router.navigate(['/main-form']);
    } else {
      alert("Lütfen görev adı, açıklama ve bitiş tarihini girin.");
    }
  }

  // ID'yi otomatik olarak artırıyoruz
  private generateId(): number {
    const tasks = this.taskService.getTasks();
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
  }
}
