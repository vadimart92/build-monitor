import {Injectable} from '@angular/core';
import {
  BuildScreenData,
  BuildData,
  BuildServer,
  BuildServerType,
  BuildStatus,
  BuildViewType,
  Change,
  Screen,
  ScreenType,
  Profile,
  TcBuildInfo,
  User
} from "./data-contracts";

import *  as  data from './sampleData.json';
import *  as  samples from './samples.json';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private profiles:  Profile [] = [
    <Profile>{id: "1", name: "test", description: "test desc", config: "..."},
    <Profile>{id: "2", name: "empty", description: "empty desc", config: "..."}
  ]

  getProfiles() : Profile [] {
    return this.profiles;
  }
  getBuildServers():BuildServer []{
    return [
      <BuildServer>{id: "1", description: "test desc", config: {name: "test"}, type: BuildServerType.TeamCity},
      <BuildServer>{id: "2", description: "empty desc", config: {name: "empty"}, type: BuildServerType.TeamCity}
    ]
  }
  getScreens(configName): Screen[] {
    if (configName == "empty"){
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
    const profile = <Profile>{
      id: "0",
      name: "sample",
      description: "desc",
      config: samples.profile
    };
    return profile;
  }
  createSampleBuildServer():BuildServer {
        return <BuildServer>{
          type: BuildServerType.TeamCity,
          config: samples.buildServer,
          id: "0",
          description: "desc"
        }
  }

  getProfile(profileId: string) {
    return this.getProfiles().find(p => p.id === profileId);
  }

  saveProfile(profile: Profile) : Promise<void> {
    return Promise.resolve();
  }

  getBuildServer(buildServerId: string) {
    return this.getBuildServers().find(p => p.id === buildServerId);
  }

  async saveBuildServer(buildServer: BuildServer): Promise<void> {
    return Promise.resolve();
  }
}
