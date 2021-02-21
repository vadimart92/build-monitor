import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-build-date-info',
  templateUrl: './build-date-info.component.html',
  styleUrls: ['./build-date-info.component.css']
})
export class BuildDateInfoComponent implements OnInit {

  @Input() startDate: Date;
  @Input() endDate: Date;
  dateFormat = 'dd.MM HH:mm';
  constructor() { }

  ngOnInit(): void {
  }

}
