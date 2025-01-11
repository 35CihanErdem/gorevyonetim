import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CardModule,TableModule,CommonModule,ButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  
  tableData = [
    { name: 'John', age: 28, info: 'Loves programming.' },
    { name: 'Jane', age: 32, info: 'Enjoys outdoor activities.' },
    { name: 'Alice', age: 24, info: 'Passionate about music.' },
  ];

  selectedRow: any = null;

  showCard(rowData: any) {
    this.selectedRow = rowData;
  }
}
