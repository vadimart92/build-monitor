import { Injectable } from '@angular/core';

import * as profileSchema from './.schema/profile.schema.json'
import * as buildTypeSchema from './.schema/build-server.schema.json'
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  constructor(private dataService: DataService) { }

  getProfileSchema() {
    const config = (<any>profileSchema).default;
    const buildServers = this.dataService.getBuildServers();
    const buildServerNames = buildServers.map(s => s.name);
    config.schema.definitions.buildList.properties.buildServer.default = buildServerNames[0];
    config.schema.definitions.buildList.properties.buildServer.enum = buildServerNames;
    return config;
  }
  getBuildTypeSchema(){
    const config = (<any>buildTypeSchema).default;
    return config;
  }
}
