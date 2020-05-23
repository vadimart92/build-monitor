import {Component, OnInit} from '@angular/core';

import {DataService} from "../data-services/data.service";
import {Screen, ScreenType} from "../data-contracts";
import {ActivatedRoute} from "@angular/router";
import {BuildInfoService} from "../data-services/build-info.service";

@Component({
  selector: 'app-monitor-list',
  templateUrl: './screen-list.component.html',
  styleUrls: ['./screen-list.component.css']
})
export class ScreenListComponent implements OnInit {
  monitorItems: Screen[];
  public monitorType = ScreenType;
  constructor(private monitorService: DataService, private route: ActivatedRoute,
              private _buildInfoService: BuildInfoService) { }
  ngOnInit() {
    let profile = this.route.snapshot.paramMap.get('profile');
    this.monitorItems = this.monitorService.openProfile(profile);
    this._buildInfoService.subscribeForProfile(profile);
  }

}
