import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';

import {DataService} from "../data.service";
import {Screen, ScreenType} from "../data-contracts";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-monitor-list',
  templateUrl: './screen-list.component.html',
  styleUrls: ['./screen-list.component.css']
})
export class ScreenListComponent implements OnInit {
  monitorItems: Screen[];
  public monitorType = ScreenType;
  constructor(private monitorService: DataService, private route: ActivatedRoute) { }
  ngOnInit() {
    let profile = this.route.snapshot.paramMap.get('profile');
    this.monitorItems = this.monitorService.getScreens(profile);
  }

}
