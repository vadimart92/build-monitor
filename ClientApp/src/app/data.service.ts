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

export class DataService {

  getProfiles() : Profile []{
    return [
      {id: 1, name: "test", description: "test desc", config: "..."},
      {id: 1, name: "empty", description: "empty desc", config: "..."}
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
  createSampleProfile():Profile {
    return {
      config: '-  martin:\n' +
        '    name: Martin D\'vloper\n' +
        '    job: Developer\n' +
        '    skills:\n' +
        '      - python\n' +
        '      - perl\n' +
        '      - pascal\n' +
        '-  tabitha:\n' +
        '    name: Tabitha Bitumen\n' +
        '    job: Developer\n' +
        '    skills:\n' +
        '      - lisp\n' +
        '      - fortran\n' +
        '      - erlang',
      id: 0,
      name: "sample",
      description: "desc"
    }
  }
}
