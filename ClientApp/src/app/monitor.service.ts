import {Injectable} from '@angular/core';
import {
  BuildMonitorInfoItem,
  BuildMonitorInfo,
  BuildStatus,
  BuildViewType,
  Change,
  MonitorItem,
  MonitorType,
  TcBuildInfo, User, Profile
} from "./data-contracts";

import *  as  data from './sampleData.json';

@Injectable({
  providedIn: 'root'
})

export class MonitorService {

  getProfiles() : Profile []{
    return [
      {id: 1, name: "test", description: "test desc"},
      {id: 1, name: "empty", description: "empty desc"}
    ]
  }
  getMonitors(configName) {
    if (configName == "empty"){
      return [];
    }
    const builds = data.builds.map(function (build) {
      return <BuildMonitorInfoItem>{
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
      <MonitorItem>({
        type: MonitorType.BuildInfo,
        name: "core",
        config: <BuildMonitorInfo> {
          builds: builds
        }
      })
    ];
  }
}
