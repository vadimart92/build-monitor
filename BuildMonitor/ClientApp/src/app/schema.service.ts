import {Injectable} from '@angular/core';

import * as profileSchema from './.schema/profile.schema.json'
import * as buildServerSchema from './.schema/build-server.schema.json'
import {UIUtils} from "./uiutils";
import {BuildServerService} from "./data-services/build-server.service";

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  constructor(private dataService: BuildServerService, private _uiUtils: UIUtils) { }

  async getProfileSchema() : Promise<any> {
    const config = (<any>profileSchema).default;
    const buildServers = await this.dataService.getAll().toPromise();
    const buildServerNames = buildServers.map(s => this._uiUtils.getBuildServerName(s));
    config.schema.definitions.buildList.properties.buildServer.default = buildServerNames[0];
    config.schema.definitions.buildList.properties.buildServer.enum = buildServerNames;
    return config;
  }
  getBuildServerSchema(){
    return (<any>buildServerSchema).default;
  }
}
