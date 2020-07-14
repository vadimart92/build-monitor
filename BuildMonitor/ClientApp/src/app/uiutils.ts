import {BaseConfigItem, BuildServer} from "./data-contracts";
import { Injectable } from "@angular/core";

@Injectable()
export class UIUtils {
  getConfigText(configItem: BaseConfigItem){
    return JSON.stringify(configItem.config, null, 4);
  }
  setConfig(configItem: BaseConfigItem, text: string){
    configItem.config = JSON.parse(text);
  }

  getBuildServerName(buildServer: BuildServer) {
    return buildServer.config.name;
  }
}
