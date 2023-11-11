import { Component, Input } from '@angular/core';
import { TableData } from 'src/app/core/interfaces/TableData.interface';
import { Director } from 'src/app/core/interfaces/director';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss']
})
export class MyTableComponent<T> {
  filtered = false;
  @Input() data: T[] = [];
  search: string;
}
