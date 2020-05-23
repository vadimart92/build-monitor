import {Injectable, NgZone} from '@angular/core';
import {
  BuildInfo, BuildScreenData,
  BuildStatus,
  Screen,
  ScreenType,
  TcBuildInfo
} from "../data-contracts";
import {from, Observable, Subject} from "rxjs";
import * as signalR from "@aspnet/signalr";
import * as data from "../sampleData.json";

@Injectable({
  providedIn: 'root'
})
export class ProfileInfoService {
  private subjects: object = {};
  private hubConnection: signalR.HubConnection
  constructor(private zone:NgZone) {
    (<any>window).BuildInfoService = this;
   this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("/profile")
      .build();
    this._connectionOpen = this.hubConnection.start();
  }
  private _connectionOpen: Promise<void>;
  getBuildInfo<TBuildInfo extends BuildInfo>(buildInfoId: string) : Observable<TBuildInfo>{
    if (!this.subjects[buildInfoId]){
      this.subjects[buildInfoId] = new Subject<TBuildInfo>();
    }
    return this.subjects[buildInfoId].asObservable();
  }

  subscribeForProfile(profileName: string) : Observable<Screen[]> {
    console.warn(`subscribeForProfile ${profileName}`);
    this._connectionOpen.then(value => {
      this.hubConnection.send("subscribe", profileName)
        .then(() => {
          console.info("subscribed")
        });
    })
    return from([this._openProfile(profileName)]);
  }
  unsubscribeFromProfile(profileName: string) : Promise<void> {
    console.warn(`unsubscribeFromProfile ${profileName}`);
    return this.hubConnection.send("unsubscribe", profileName);
  }

  _openProfile(configProfileId): Screen[] {
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
