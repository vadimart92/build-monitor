import { Component, OnInit, NgZone } from '@angular/core';
import {BuildServer} from "../data-contracts";
import {SchemaService} from "../schema.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {UIUtils} from "../uiutils";
import {UIBuildServerService} from "../data-services/uibuild-server.service";

@Component({
  selector: 'app-build-server-edit',
  templateUrl: './build-server-edit.component.html',
  styleUrls: ['./build-server-edit.component.css']
})
export class BuildServerEditComponent implements OnInit {
  isNewMode: boolean;
  editorOptions = {theme: 'vs-dark', language: 'json'};
  buildServer: BuildServer;
  config: string;
  editorInitialized: boolean = false;
  constructor(private _schemaService: SchemaService, private _route: ActivatedRoute,
              private _location: Location, private _buildServerService: UIBuildServerService,
              private _uiUtils: UIUtils, private _zone: NgZone) { }

  async ngOnInit(): Promise<void> {
    this.isNewMode = this._route.snapshot.paramMap.get('mode') === "new";
    if (this.isNewMode){
      this.buildServer = this._buildServerService.createSample();
    } else {
      let id = this._route.snapshot.paramMap.get('id');
      this.buildServer = await this._buildServerService.get(id).toPromise();
    }
    this.config = this._uiUtils.getConfigText(this.buildServer);
  }

  onInit(editor) {
    const buildServerSchema = this._schemaService.getBuildServerSchema();
    (<any>window).monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [buildServerSchema]
    });
    this._zone.run(() => this.editorInitialized = true);
  }

  async save() {
    this._uiUtils.setConfig(this.buildServer, this.config);
    await this._buildServerService.save(this.buildServer);
    this.back();
  }

  back() {
    this._location.back();
  }
}
