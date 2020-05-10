export enum BuildViewType {
  TeamCity,
  Default
}
export class BuildData {
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

export class TcBuildInfo extends BuildInfo{
  public changes: Change[]
  public projectName: string
}
export interface IScreenData {}
export class BuildScreenData implements IScreenData{
  public builds: BuildData[]
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

export enum ScreenType {
  BuildInfo
}
export class Screen {
  public id: string;
  public type: ScreenType
  public data: IScreenData
}

export class BaseConfigItem {
  id: string;
  description: string;
  config: any;
}

export class Profile extends BaseConfigItem {
  name: string;
}

export enum BuildServerType {
  TeamCity,
  Jenkins
}
export class BuildServer extends BaseConfigItem {
  type: BuildServerType
  getName() {
    return this.config.name;
  }
}
