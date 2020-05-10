import {Component, Input, OnInit} from '@angular/core';
import {BuildStatus, TcBuildInfo} from "../data-contracts";
import {BaseBuildInfoComponent} from "../base-build-info/base-build-info.component";

@Component({
  selector: 'app-tc-build-info',
  templateUrl: './tc-build-info.component.html',
  styleUrls: ['./tc-build-info.component.scss']
})
export class TcBuildInfoComponent extends BaseBuildInfoComponent implements OnInit {
  @Input() buildInfo: TcBuildInfo;

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit()
  }

}
