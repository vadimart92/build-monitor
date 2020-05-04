import {
  Component,
  OnInit,
  QueryList,
  AfterViewInit,
  ViewChildren,
  ViewContainerRef,
  ComponentFactoryResolver, ChangeDetectorRef, Input
} from '@angular/core';
import {BuildViewType, MonitorItem} from "../data-contracts";

@Component({
  selector: 'app-build-monitor',
  templateUrl: './build-monitor.component.html',
  styleUrls: ['./build-monitor.component.css']
})
export class BuildMonitorComponent implements OnInit {
  public buildViewType = BuildViewType;
  @Input() monitorItem: MonitorItem;
  constructor() { }

  ngOnInit(): void {
  }



}
