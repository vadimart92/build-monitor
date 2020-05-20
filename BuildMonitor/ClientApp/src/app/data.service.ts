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

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
  }

  getProfiles() : Observable<Profile[]> {
    return this.http.get<Profile[]>("/api/configuration/getProfiles");
  }
  getBuildServers():Observable<BuildServer[]>{
    return this.http.get<BuildServer[]>("/api/configuration/getBuildServers");
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
  async saveProfile(profile: Profile) : Promise<void> {
    await this.http.post("/api/configuration/saveProfile", profile).toPromise();
  }

  getBuildServer(buildServerId: string) : Observable<BuildServer> {
    return this.http.get<BuildServer>(`/api/configuration/getBuildServer/${buildServerId}`);
  }

  getProfile(profileId: string) : Observable<Profile> {
    return this.http.get<Profile>(`/api/configuration/getProfile/${profileId}`);
  }
  async removeBuildServer(buildServerId: string) : Promise<void>{
    await this.http.delete(`/api/configuration/removeBuildServer/${buildServerId}`).toPromise();
  }

  async removeProfile(buildServerId: string) : Promise<void>{
    await this.http.delete(`/api/configuration/removeProfile/${buildServerId}`).toPromise();
  }

  async saveBuildServer(buildServer: BuildServer): Promise<void> {
    await this.http.post("/api/configuration/saveBuildServer", buildServer).toPromise();
    this._snackBar.open(`Build server ${name} saved.`);
  }
}
