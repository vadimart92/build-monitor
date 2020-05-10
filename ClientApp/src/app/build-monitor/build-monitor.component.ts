import {
  Component,
  OnInit,
  QueryList,
  AfterViewInit,
  ViewChildren,
  ViewContainerRef,
  ComponentFactoryResolver, ChangeDetectorRef, Input
} from '@angular/core';
import {BuildScreenData, BuildViewType, Screen} from "../data-contracts";

@Component({
  selector: 'app-build-monitor',
  templateUrl: './build-monitor.component.html',
  styleUrls: ['./build-monitor.component.css']
})
export class BuildMonitorComponent implements OnInit {
  public buildViewType = BuildViewType;
  @Input() screen: Screen;
  buildScreenData: BuildScreenData;
  constructor() { }

  ngOnInit(): void {
    this.buildScreenData = this.screen.data as BuildScreenData;
  }

}
