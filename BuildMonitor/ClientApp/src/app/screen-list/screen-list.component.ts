import {Component, OnInit, OnDestroy} from '@angular/core';
import {Screen, ScreenType} from "../data-contracts";
import {ActivatedRoute} from "@angular/router";
import {ProfileInfoService} from "../data-services/profile-info.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-monitor-list',
  templateUrl: './screen-list.component.html',
  styleUrls: ['./screen-list.component.css']
})
export class ScreenListComponent implements OnInit, OnDestroy {
  monitorItems$: Observable<Screen[]>;
  public monitorType = ScreenType;
  private _profileName;
  constructor(private route: ActivatedRoute, private _profileInfoService: ProfileInfoService) { }
  ngOnInit() {
    this._profileName = this.route.snapshot.paramMap.get('profile');
    this.monitorItems$ = this._profileInfoService.subscribeForProfile(this._profileName);
  }

  ngOnDestroy(): void {
    this._profileInfoService.unsubscribeFromProfile(this._profileName);
  }

}
