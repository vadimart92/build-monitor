import { Injectable } from '@angular/core';

import * as profileSchema from './profile.schema.json'
import * as buildTypeSchema from './build-server.schema.json'
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  constructor(private dataService: DataService) { }

  getProfileSchema() {
    const config = (<any>profileSchema).default;
    const buildServers = this.dataService.getBuildServers();
    config.schema.properties.buildServer.enum = buildServers.map(s => s.name);
    return config;
  }
  getBuildTypeSchema(){
    const config = (<any>buildTypeSchema).default;
    return config;
  }
}
