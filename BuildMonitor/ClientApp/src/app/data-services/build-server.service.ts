import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BuildServer} from "../data-contracts";
import {SampleBuildServer} from '../samples/sample-build-server';
import {BaseCrudService} from "./base-crud.service";

@Injectable({
  providedIn: 'root'
})
export class BuildServerService extends BaseCrudService<BuildServer> {

  constructor(protected http: HttpClient) {
    super(http, 'BuildServers');
  }

  createSample(): BuildServer {
    return <BuildServer>{
      config: SampleBuildServer,
      description: "desc"
    };
  }

}
