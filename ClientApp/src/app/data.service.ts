import {Injectable} from '@angular/core';
import {
  BuildData,
  BuildScreenData,
  BuildServer,
  BuildStatus,
  BuildViewType,
  Change,
  Profile,
  Screen,
  ScreenType,
  TcBuildInfo,
  User
} from "./data-contracts";

import *  as  data from './sampleData.json';
import *  as  samples from './samples.json';
import {HttpClient} from "@angular/common/http";
import {from, Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private _buildServers: BuildServer[] = [
    <BuildServer>{description: "test desc", config: {name: "test"}},
    <BuildServer>{description: "empty desc", config: {name: "empty"}}
  ]

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
  }

  getProfiles() : Observable<Profile[]> {
    return this.http.get<Profile[]>("/api/configuration/getProfiles");
  }
  getBuildServers():Observable<BuildServer[]>{
    return from([this._buildServers]);
  }
  getScreens(configProfileId): Screen[] {
    if (configProfileId == "empty"){
      return [];
    }
    const builds = data.builds.map(function (build) {
      return <BuildData>{
        viewType: BuildViewType.TeamCity,
        config: <TcBuildInfo>{
          id: build.id,
          name: build.definition,
          projectName: build.project,
          number: build.number,
          status: build.status === "Green" ? BuildStatus.Success : BuildStatus.Failed,
          url: build.url,
          changes: [
            <Change>{author: <User>{name: "v.artemchuk", avatarImage: ""}}
          ]
        }
      }
    });
    return [
      <Screen>({
        id: "id1",
        type: ScreenType.BuildInfo,
        data: <BuildScreenData> {
          builds: builds
        }
      })
    ];
  }
  createSampleProfile():Profile {
    return <Profile>{
      name: "sample",
      description: "desc",
      config: samples.profile
    };
  }
  createSampleBuildServer():BuildServer {
    return <BuildServer>{
      config: samples.buildServer,
      description: "desc"
    };
  }

  getProfile(profileId: string) {
    return this._profiles.find(p => p.name === profileId);
  }

  private _profiles:  Profile [] = [
    <Profile>{name: "test", description: "test desc", config: "..."},
    <Profile>{name: "empty", description: "empty desc", config: "..."}
  ]
  saveProfile(profile: Profile) : Promise<void> {
    if (!this.getProfile(profile.name)){
      this._profiles.push(profile);
    }
    return Promise.resolve();
  }

  getBuildServer(buildServerId: string) {
    return this._buildServers.find(p => p.config.name === buildServerId);
  }

  async saveBuildServer(buildServer: BuildServer): Promise<void> {
    const name = buildServer.config.name;
    buildServer.config = JSON.stringify(buildServer.config);
    buildServer.name = name;
    await this.http.post("/api/configuration/saveBuildServer", buildServer).toPromise();
    this._snackBar.open(`Build server ${name} saved.`);
  }
}
