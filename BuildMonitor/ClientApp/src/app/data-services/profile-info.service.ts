import { Injectable, NgZone } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import {
  BuildInfo,
  BuildScreenData,
  ProfileInfo,
  Screen,
  ScreenType,
} from '../data-contracts';
import { SampleBuilds } from '../samples/sample-builds';
import { SignalRService } from '../shared/signalR/signalR-service';

@Injectable({
  providedIn: 'root',
})
export class ProfileInfoService {
  private hubConnection: signalR.HubConnection;
  private _profileSubjects: object = {};
  private _connectionOpen: Promise<void>;
  private buildInfoSubjects: object = {};

  constructor(private zone: NgZone, private signalRService: SignalRService) {
    (<any>window).BuildInfoService = this;
    this.hubConnection = this.signalRService.buildHubConnection('profile');
    this.hubConnection.on('profileDataReady', (profileName, profileData) => {
      const subject = this._getOrCreateProfileSubject(profileName);
      const screens = profileData || this._openProfile(profileName);
      this.zone.run(() => subject.next(screens));
    });
    this.hubConnection.on('buildInfoReady', (buildInfo) => {
      const info = buildInfo.config;
      console.debug(`buildInfoReady ${info.id}`);
      const subject = this._getOrCreateBuildInfoSubject<BuildInfo>(info.id);
      info.startedOn = new Date(info.startedOn);
      info.completedOn = new Date(info.completedOn);
      this.zone.run(() => subject.next(info));
    });
    this._connectionOpen = this.hubConnection.start();
  }

  _getOrCreateProfileSubject(profileName: string): Subject<ProfileInfo> {
    if (!this._profileSubjects.hasOwnProperty(profileName)) {
      this._profileSubjects[profileName] = new Subject<ProfileInfo>();
    }
    return this._profileSubjects[profileName];
  }

  _getOrCreateBuildInfoSubject<TBuildInfo extends BuildInfo>(
    buildInfoId: string
  ): Subject<TBuildInfo> {
    if (!this.buildInfoSubjects[buildInfoId]) {
      this.buildInfoSubjects[buildInfoId] = new Subject<TBuildInfo>();
    }
    return this.buildInfoSubjects[buildInfoId];
  }

  getBuildInfo<TBuildInfo extends BuildInfo>(
    buildInfoId: string
  ): Observable<TBuildInfo> {
    this._connectionOpen.then((value) => {
      this.hubConnection
        .send('subscribeForBuildInfo', buildInfoId)
        .then(() => console.debug(`subscribed for build info ${buildInfoId}`));
    });
    const subject = this._getOrCreateBuildInfoSubject<TBuildInfo>(buildInfoId);
    return subject.asObservable();
  }

  unsubscribeFromBuildInfo(buildInfoId: string): Promise<void> {
    console.debug(`unsubscribeFromBuildInfo ${buildInfoId}`);
    return this.hubConnection.send('unsubscribeFromBuildInfo', buildInfoId);
  }

  subscribeForProfile(profileName: string): Observable<ProfileInfo> {
    console.warn(`subscribeForProfile ${profileName}`);
    this._connectionOpen.then((value) => {
      this.hubConnection
        .send('subscribe', profileName)
        .then(() => console.debug(`subscribed for profile ${profileName}`));
    });
    return this._getOrCreateProfileSubject(profileName).asObservable();
  }

  unsubscribeFromProfile(profileName: string): Promise<void> {
    console.debug(`unsubscribeFromProfile ${profileName}`);
    return this.hubConnection.send('unsubscribe', profileName);
  }

  _openProfile(configProfileId): ProfileInfo {
    if (configProfileId === 'empty') {
      return new ProfileInfo();
    }
    return <ProfileInfo>{
      screens: [
        <Screen>{
          id: 'id1',
          type: ScreenType.BuildInfo,
          data: <BuildScreenData>{
            builds: <any>SampleBuilds,
          },
        },
      ],
    };
  }
}
