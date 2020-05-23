import {Injectable} from '@angular/core';
import {
  BuildData,
  BuildScreenData,
  BuildStatus,
  BuildViewType,
  Change,
  Screen,
  ScreenType,
  TcBuildInfo,
  User
} from "../data-contracts";

import *  as  data from '../sampleData.json';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
  }

  openProfile(configProfileId): Screen[] {
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

}
