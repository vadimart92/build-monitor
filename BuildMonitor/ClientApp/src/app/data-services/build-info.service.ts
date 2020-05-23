import {Injectable, NgZone} from '@angular/core';
import {
  BuildData,
  BuildInfo, BuildScreenData,
  BuildStatus,
  BuildViewType,
  Change,
  Screen,
  ScreenType,
  TcBuildInfo,
  User
} from "../data-contracts";
import {Observable, Subject} from "rxjs";
import * as data from "../sampleData.json";

@Injectable({
  providedIn: 'root'
})
export class BuildInfoService {
  private subjects: object = {};
  constructor(private zone:NgZone) {
    (<any>window).BuildInfoService = this;
  }
  getBuildInfo<TBuildInfo extends BuildInfo>(buildInfoId: string) : Observable<TBuildInfo>{
    if (!this.subjects[buildInfoId]){
      this.subjects[buildInfoId] = new Subject<TBuildInfo>();
    }
    return this.subjects[buildInfoId].asObservable();
  }

  subscribeForProfile(profileName: string){
    console.warn(`subscribeForProfile ${profileName}`);
  }
  unsubscribeFromProfile(profileName: string){
    console.warn(`unsubscribeFromProfile ${profileName}`);
  }

  openProfile(configProfileId): Screen[] {
    if (configProfileId == "empty"){
      return [];
    }
    return [
      <Screen>({
        id: "id1",
        type: ScreenType.BuildInfo,
        data: <BuildScreenData> {
          builds: data.builds
        }
      })
    ];
  }
  refresh(){
    const info = new TcBuildInfo();
    info.id = "xxxx";
    info.name = "xxxx";
    info.number = "xxxx";
    info.status = BuildStatus.Failed
    Object.keys(this.subjects).forEach(id => {
      const subject = this.subjects[id];
      this.zone.run(() => subject.next(info));
    });
  }
}
