import {Injectable} from '@angular/core';
import {BaseCrudService} from "./base-crud.service";
import {Profile} from "../data-contracts";
import {HttpClient} from "@angular/common/http";
import * as samples from "../samples.json";

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseCrudService<Profile> {

  constructor(protected http: HttpClient) {
    super(http, "Profiles");
  }

  createSample():Profile {
    return <Profile>{
      name: "sample",
      description: "desc",
      config: samples.profile
    };
  }

}
