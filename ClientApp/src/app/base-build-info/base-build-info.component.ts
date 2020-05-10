import {Component, Input, OnInit} from '@angular/core';
import {BuildInfo, BuildStatus} from "../data-contracts";

@Component({
  selector: 'app-base-build-info',
  templateUrl: './base-build-info.component.html',
  styleUrls: ['./base-build-info.component.css']
})
export class BaseBuildInfoComponent implements OnInit {

  @Input() buildInfo: BuildInfo;
  public buildStatus = BuildStatus;
  constructor() { }

  ngOnInit(): void {
  }

  getStatusClass(): string {
    return "build-status-" + this.buildStatus[this.buildInfo.status].toLowerCase()
  }
}
