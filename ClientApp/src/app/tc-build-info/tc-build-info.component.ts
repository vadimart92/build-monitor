import {Component, Input, OnInit} from '@angular/core';
import {BuildStatus, TcBuildInfo} from "../data-contracts";

@Component({
  selector: 'app-tc-build-info',
  templateUrl: './tc-build-info.component.html',
  styleUrls: ['./tc-build-info.component.scss']
})
export class TcBuildInfoComponent implements OnInit {
  @Input() buildConfig: TcBuildInfo;
  public buildStatus = BuildStatus;
  constructor() { }

  ngOnInit(): void {
  }

  getStatusClass(): string {
    return "build-status-" + this.buildStatus[this.buildConfig.status].toLowerCase()
  }
}
