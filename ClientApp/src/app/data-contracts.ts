import {Type} from "@angular/core";
export enum BuildViewType {
  TeamCity
}
export enum MonitorType {
  BuildInfo
}
export class BuildConfigItem {
  public viewType: BuildViewType
  public config: BuildInfo
}
export enum BuildStatus {
  Undefined,
  Running,
  Success,
  Failed
}
export class BuildInfo {
  public id: string;
  public name: string;
  public number: string;
  public status: BuildStatus;
  public url: string;
  public startedBy: string;
  public startedOn: Date;
  public durationSeconds: number
}

export class BuildMonitorConfig {
  public builds: BuildConfigItem[]
}
export class User {
  public name: string
  public avatarImage: string
  getAvatarImage() {
    return "https://secure.gravatar.com/avatar/e0d74fa45947023e43e5846320951c59?d=mm&s=48"
  }
}
export class Change {
  public message: string;
  public author: User
}

export class TcBuildInfo extends BuildInfo{
  public changes: Change[]
  public projectName: string
}

export class MonitorItem {
  public type: MonitorType
  public name: string
  public config: BuildMonitorConfig
}
