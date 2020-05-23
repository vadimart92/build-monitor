import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';

import {Profile} from "../data-contracts";
import {SchemaService} from "../schema.service";
import {UIUtils} from "../uiutils";
import {UIProfileService} from "../data-services/uiprofile.service";

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
  editorInitialized: boolean = false;
  constructor(private _schemaService: SchemaService, private _route: ActivatedRoute,
              private _location: Location, private _profileService: UIProfileService, private _uiUtils: UIUtils, private _zone: NgZone) {}

  async ngOnInit(): Promise<void> {
    this.isNewMode = this._route.snapshot.paramMap.get('mode') === "new";
    if (this.isNewMode){
      this.profile = this._profileService.createSample();
    } else {
      let profileId = this._route.snapshot.paramMap.get('id');
      this.profile = await this._profileService.get(profileId).toPromise();
    }
    this.config = this._uiUtils.getConfigText(this.profile);
  }

  async save() {
    this._uiUtils.setConfig(this.profile, this.config);
    await this._profileService.save(this.profile);
    this._location.back();
  }

  back() {
    this._location.back();
  }

  async onInit(editor) {
    const profileSchema = await this._schemaService.getProfileSchema();
    (<any>window).monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [profileSchema]
    });
    this._zone.run(() => this.editorInitialized = true);
  }

}
