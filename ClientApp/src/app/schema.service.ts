import {Injectable} from '@angular/core';

import * as profileSchema from './.schema/profile.schema.json'
import * as buildServerSchema from './.schema/build-server.schema.json'
import {DataService} from "./data.service";
import {UIUtils} from "./uiutils";

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  constructor(private dataService: DataService, private _uiUtils: UIUtils) { }

  getProfileSchema() {
    const config = (<any>profileSchema).default;
    const buildServers = this.dataService.getBuildServers();
    const buildServerNames = buildServers.map(s => this._uiUtils.getBuildServerName(s));
    config.schema.definitions.buildList.properties.buildServer.default = buildServerNames[0];
    config.schema.definitions.buildList.properties.buildServer.enum = buildServerNames;
    return config;
  }
  getBuildServerSchema(){
    return (<any>buildServerSchema).default;
  }
}
