import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';

import {DataService} from "../data.service";
import {Profile} from "../data-contracts";
import {SchemaService} from "../schema.service";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  isNewMode: boolean;
  editorOptions = {theme: 'vs-dark', language: 'json'};
  profile: Profile;
  constructor(private schema: SchemaService, private route: ActivatedRoute, private _location: Location, private monitorService: DataService) {}

  ngOnInit(): void {
    this.isNewMode = this.route.snapshot.paramMap.get('mode') === "new";
    if (this.isNewMode){
      this.profile = this.monitorService.createSampleProfile();
    } else {
      let profileId = this.route.snapshot.paramMap.get('id');
      this.profile = this.monitorService.getProfile(profileId);
    }
  }

  async save() {
    await this.monitorService.saveProfile(this.profile);
    this._location.back();
  }

  back() {
    this._location.back();
  }

  onInit(editor) {
    let line = editor.getPosition();
    monaco.languages.json.jsonDefaults.diagnosticsOptions.schemas.length = 0;
    const profileSchema = this.schema.getProfileSchema();
    monaco.languages.json.jsonDefaults.diagnosticsOptions.schemas.push(profileSchema);
  }

}
