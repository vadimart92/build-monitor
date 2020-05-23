import {Component, Input, OnInit, OnDestroy} from '@angular/core';

import {BuildInfo, BuildStatus} from "../data-contracts";
import {BuildInfoService} from "../data-services/build-info.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-base-build-info',
  templateUrl: './base-build-info.component.html',
  styleUrls: ['./base-build-info.component.css']
})
export class BaseBuildInfoComponent<TBuildInfo extends BuildInfo> implements OnInit,OnDestroy {

  @Input() buildInfo: TBuildInfo;
  public buildStatus = BuildStatus;
  private _subscription: Subscription;
  constructor(protected buildInfoService: BuildInfoService) {
  }

  ngOnInit(): void {
    this._subscription = this.buildInfoService.getBuildInfo<TBuildInfo>(this.buildInfo.id)
      .subscribe(value => {
        return this.buildInfo = value;
      });
  }

  getStatusClass(): string {
    return "build-status-" + this.buildStatus[this.buildInfo.status].toLowerCase()
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
