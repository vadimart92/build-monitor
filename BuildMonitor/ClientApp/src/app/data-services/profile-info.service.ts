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
  private buildInfoSubjects: object = {};
  private hubConnection: signalR.HubConnection
  constructor(private zone:NgZone) {
    (<any>window).BuildInfoService = this;
   this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("/profile")
      .build();
   this.hubConnection.on("profileDataReady", (profileName, profileData) => {
      const subject = this._getOrCreateProfileSubject(profileName);
      const screens = profileData.screens || this._openProfile(profileName);
      this.zone.run(() => subject.next(screens));
   });
    this._connectionOpen = this.hubConnection.start();
  }
  private _connectionOpen: Promise<void>;
  getBuildInfo<TBuildInfo extends BuildInfo>(buildInfoId: string) : Observable<TBuildInfo>{
    if (!this.buildInfoSubjects[buildInfoId]){
      this.buildInfoSubjects[buildInfoId] = new Subject<TBuildInfo>();
    }
    return this.buildInfoSubjects[buildInfoId].asObservable();
  }

  subscribeForProfile(profileName: string) : Observable<Screen[]> {
    console.warn(`subscribeForProfile ${profileName}`);
    this._connectionOpen.then(value => {
      this.hubConnection.send("subscribe", profileName)
        .then(() => {
          console.info("subscribed")
        });
    });
    return this._getOrCreateProfileSubject(profileName).asObservable();
  }

  private _profileSubjects: object = {};
  _getOrCreateProfileSubject(profileName: string) : Subject<Screen[]>{
    if (!this._profileSubjects.hasOwnProperty(profileName)){
      this._profileSubjects[profileName] = new Subject<Screen[]>();
    }
    return this._profileSubjects[profileName];
  }
  _completeProfileSubject(profileName: string) {
    const subject = this._getOrCreateProfileSubject(profileName);
    subject.complete();
    delete this._profileSubjects[profileName];
  }
  unsubscribeFromProfile(profileName: string) : Promise<void> {
    console.warn(`unsubscribeFromProfile ${profileName}`);
    this._completeProfileSubject(profileName);
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
    Object.keys(this.buildInfoSubjects).forEach(id => {
      const subject = this.buildInfoSubjects[id];
      this.zone.run(() => subject.next(info));
    });
  }
}
