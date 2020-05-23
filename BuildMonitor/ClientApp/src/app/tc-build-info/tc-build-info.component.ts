import {Component, OnInit} from '@angular/core';
import {TcBuildInfo} from "../data-contracts";
import {BaseBuildInfoComponent} from "../base-build-info/base-build-info.component";
import {ProfileInfoService} from "../data-services/profile-info.service";

@Component({
  selector: 'app-tc-build-info',
  templateUrl: './tc-build-info.component.html',
  styleUrls: ['./tc-build-info.component.scss']
})
export class TcBuildInfoComponent extends BaseBuildInfoComponent<TcBuildInfo> implements OnInit {

  constructor(protected profileInfoService: ProfileInfoService) {
    super(profileInfoService);
  }

  ngOnInit(): void {
    super.ngOnInit()
  }

}
