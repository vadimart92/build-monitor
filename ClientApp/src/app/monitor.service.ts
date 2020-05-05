import {Injectable} from '@angular/core';
import {
  BuildMonitorInfoItem,
  BuildMonitorInfo,
  BuildStatus,
  BuildViewType,
  Change,
  MonitorItem,
  MonitorType,
  TcBuildInfo, User
} from "./data-contracts";

import *  as  data from './sampleData.json';

@Injectable({
  providedIn: 'root'
})

export class MonitorService {

  getMonitors(configName) {
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
