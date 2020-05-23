import {Component, Input, OnInit} from '@angular/core';
import {BuildServer} from "../data-contracts";
import {Router} from "@angular/router";
import {UIUtils} from "../uiutils";
import {Observable} from "rxjs";
import {UIBuildServerService} from "../data-services/uibuild-server.service";

@Component({
  selector: 'app-build-server-list',
  templateUrl: './build-server-list.component.html',
  styleUrls: ['./build-server-list.component.css']
})
export class BuildServerListComponent implements OnInit {

  @Input() buildServers$: Observable<BuildServer[]>;
  displayedColumns: string[] = ['name', 'type', 'description', 'actions'];
  constructor(private router: Router, private _buildServerService: UIBuildServerService, private _uiUtils: UIUtils) { }

  ngOnInit(): void {
    this.buildServers$ = this._buildServerService.getAll();
  }

  addBuildServer() {
    this.router.navigate(['/build-server', {mode: "new"}]);
  }

  edit(id: any) {
    this.router.navigate(['/build-server', {mode: "edit", id: id}]);
  }

  getTypeDisplayValue(server: BuildServer) {
    return server.config.type;
  }
  getName(server: BuildServer){
    return this._uiUtils.getBuildServerName(server);
  }

  async remove(id: any) {
    await this._buildServerService.remove(id);
    this.buildServers$ = this._buildServerService.getAll();
  }
}
