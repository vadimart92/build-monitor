import {Component, OnInit, OnDestroy} from '@angular/core';

import {DataService} from "../data-services/data.service";
import {Screen, ScreenType} from "../data-contracts";
import {ActivatedRoute} from "@angular/router";
import {BuildInfoService} from "../data-services/build-info.service";

@Component({
  selector: 'app-monitor-list',
  templateUrl: './screen-list.component.html',
  styleUrls: ['./screen-list.component.css']
})
export class ScreenListComponent implements OnInit, OnDestroy {
  monitorItems: Screen[];
  public monitorType = ScreenType;
  private _profileName;
  constructor(private monitorService: DataService, private route: ActivatedRoute,
              private _buildInfoService: BuildInfoService) { }
  ngOnInit() {
    this._profileName = this.route.snapshot.paramMap.get('profile');
    this.monitorItems = this.monitorService.openProfile(this._profileName);
    this._buildInfoService.subscribeForProfile(this._profileName);
  }

  ngOnDestroy(): void {
    this._buildInfoService.unsubscribeFromProfile(this._profileName);
  }

}
