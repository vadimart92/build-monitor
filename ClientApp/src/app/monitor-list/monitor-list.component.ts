import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';

import {DataService} from "../data.service";
import {MonitorItem, MonitorType} from "../data-contracts";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-monitor-list',
  templateUrl: './monitor-list.component.html',
  styleUrls: ['./monitor-list.component.css']
})
export class MonitorListComponent implements OnInit {
  monitorItems: MonitorItem[];
  public monitorType = MonitorType;
  constructor(private monitorService: DataService, private route: ActivatedRoute) { }
  ngOnInit() {
    let profile = this.route.snapshot.paramMap.get('profile');
    this.monitorItems = this.monitorService.getMonitors(profile);
  }

}
