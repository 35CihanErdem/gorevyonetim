import { Routes } from '@angular/router';
import { MainFormComponent } from './Component/main-form/main-form.component';
import { TaskAddComponent } from './Component/task-add/task-add.component';
import { TaskEditComponent } from './Component/task-edit/task-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: '/main-form', pathMatch: 'full' },
  { path: 'main-form', component: MainFormComponent },
  { path: 'task-add', component:TaskAddComponent,},
  { path: 'task-edit', component: TaskEditComponent }
  
];
