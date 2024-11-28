import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskItems } from '../../Services/task-model';
import { TaskService } from '../../Services/task-services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule,FormsModule,CalendarModule],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent implements OnInit {
  selectedTask: TaskItems | null = null; 
  minDate: Date = new Date();  // Takvimin minimum tarihini ayarlıyoruz

  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit() {
    // TaskService'ten selectedTask alınır
    this.selectedTask = this.taskService.selectedTask;
    console.log(this.selectedTask); 
  }

  updateTask() {
    if (this.selectedTask) {
      this.taskService.updateTask(this.selectedTask);  // Güncellenmiş görevi servis üzerinden güncelliyoruz
      this.router.navigate(['/']);  // Ana sayfaya geri yönlendiriyoruz
    }
  }

  cancel() {
    this.router.navigate(['/']);  // Ana sayfaya yönlendiriyoruz
  }
}
