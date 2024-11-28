import { CommonModule } from '@angular/common';
import { Component,  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Model } from './Services/task-model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  providers: [Model], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
 
}
