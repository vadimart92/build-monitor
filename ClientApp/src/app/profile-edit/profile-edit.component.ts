import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../data.service";
import {Profile} from "../data-contracts";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  isNewMode: boolean;
  editorOptions = {theme: 'vs-dark', language: 'yaml'};
  profile: Profile;
  constructor(private route: ActivatedRoute, private monitorService: DataService) {}

  ngOnInit(): void {
    this.isNewMode = this.route.snapshot.paramMap.get('mode') === "new";
    if (this.isNewMode){
      this.profile = this.monitorService.createSampleProfile();
    }
  }

  save() {

  }

  back() {

  }
}
