import {
  Component,
  OnInit,
  QueryList,
  AfterViewInit,
  ViewChildren,
  ViewContainerRef,
  ComponentFactoryResolver, ChangeDetectorRef, Input
} from '@angular/core';
import {BuildViewType, Screen} from "../data-contracts";

@Component({
  selector: 'app-build-monitor',
  templateUrl: './build-monitor.component.html',
  styleUrls: ['./build-monitor.component.css']
})
export class BuildMonitorComponent implements OnInit {
  public buildViewType = BuildViewType;
  @Input() screen: Screen;
  constructor() { }

  ngOnInit(): void {
  }



}
