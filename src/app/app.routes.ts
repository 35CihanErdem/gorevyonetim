import { Routes } from '@angular/router';
import { MainFormComponent } from './Component/main-form/main-form.component';
import { TaskAddComponent } from './Component/task-add/task-add.component';

export const routes: Routes = [
  { path: '', redirectTo: '/main-form', pathMatch: 'full' },
  { path: 'main-form', component: MainFormComponent },
  { path: 'task-add', component:TaskAddComponent,}
];
