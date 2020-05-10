import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';

import {DataService} from "../data.service";
import {Profile} from "../data-contracts";
import {SchemaService} from "../schema.service";
import {UIUtils} from "../uiutils";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  isNewMode: boolean;
  editorOptions = {theme: 'vs-dark', language: 'json'};
  profile: Profile;
  config: string;
  constructor(private _schemaService: SchemaService, private _route: ActivatedRoute,
              private _location: Location, private _dataService: DataService, private _uiUtils: UIUtils) {}

  ngOnInit(): void {
    this.isNewMode = this._route.snapshot.paramMap.get('mode') === "new";
    if (this.isNewMode){
      this.profile = this._dataService.createSampleProfile();
    } else {
      let profileId = this._route.snapshot.paramMap.get('name');
      this.profile = this._dataService.getProfile(profileId);
    }
    this.config = this._uiUtils.getConfigText(this.profile);
  }

  async save() {
    this._uiUtils.setConfig(this.profile, this.config);
    await this._dataService.saveProfile(this.profile);
    this._location.back();
  }

  back() {
    this._location.back();
  }

  onInit(editor) {
    const profileSchema = this._schemaService.getProfileSchema();
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [profileSchema]
    });
  }

}
