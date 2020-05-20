import {Component, Input, OnInit} from '@angular/core';
import {BuildStatus, TcBuildInfo} from "../data-contracts";
import {BaseBuildInfoComponent} from "../base-build-info/base-build-info.component";
import {BuildInfoService} from "../build-info.service";

@Component({
  selector: 'app-tc-build-info',
  templateUrl: './tc-build-info.component.html',
  styleUrls: ['./tc-build-info.component.scss']
})
export class TcBuildInfoComponent extends BaseBuildInfoComponent<TcBuildInfo> implements OnInit {

  constructor(protected buildInfoService: BuildInfoService) {
    super(buildInfoService);
  }

  ngOnInit(): void {
    super.ngOnInit()
  }

}