import {Injectable} from '@angular/core';
import {
  BuildMonitorInfo,
  BuildMonitorInfoItem,
  BuildServer,
  BuildServerType,
  BuildStatus,
  BuildViewType,
  Change,
  MonitorItem,
  MonitorType,
  Profile,
  TcBuildInfo,
  User
} from "./data-contracts";

import *  as  data from './sampleData.json';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private profiles:  Profile [] = [
    {id: "1", name: "test", description: "test desc", config: "..."},
    {id: "2", name: "empty", description: "empty desc", config: "..."}
  ]

  getProfiles() : Profile [] {
    return this.profiles;
  }
  getBuildServers():BuildServer []{
    return [
      {id: "1", name: "test", description: "test desc", config: "...", type: BuildServerType.TeamCity},
      {id: "2", name: "empty", description: "empty desc", config: "...", type: BuildServerType.TeamCity}
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
      config: '{\n' +
        '    "screens": [\n' +
        '        {\n' +
        '            "type": "buildMonitor",\n' +
        '            "displayTime": 60,\n' +
        '            "builds": [\n' +
        '                {\n' +
        '                    "buildServer": "testServer",\n' +
        '                    "config": {\n' +
        '                        "buildIds": ["coreUnitTest"]\n' +
        '                    }\n' +
        '                }\n' +
        '            ]\n' +
        '        }\n' +
        '    ]\n' +
        '}',
      id: "0",
      name: "sample",
      description: "desc"
    }
  }
  createSampleBuildServer():BuildServer {
        return {
          type: BuildServerType.TeamCity,
          config: '-  martin:\n' +
            '    name: teamCity' +
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
          id: "0",
          name: "sample",
          description: "desc"
        }
  }

  getProfile(profileId: string) {
    return this.getProfiles().find(p => p.id === profileId);
  }

  saveProfile(profile: Profile) : Promise<void> {
    return Promise.resolve();
  }
}
