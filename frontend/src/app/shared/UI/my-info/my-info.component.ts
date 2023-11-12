import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.scss']
})
export class MyInfoComponent {
  @Input() title: string = "";
  @Input() lineColor: string = "red";
}
