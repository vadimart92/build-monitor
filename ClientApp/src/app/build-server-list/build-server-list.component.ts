import {Component, Input, OnInit} from '@angular/core';
import {BuildServer, BuildServerType, Profile} from "../data-contracts";
import {Router} from "@angular/router";
import {DataService} from "../data.service";
import {UIUtils} from "../uiutils";

@Component({
  selector: 'app-build-server-list',
  templateUrl: './build-server-list.component.html',
  styleUrls: ['./build-server-list.component.css']
})
export class BuildServerListComponent implements OnInit {

  @Input() buildServers: BuildServer[];
  displayedColumns: string[] = ['id', 'name', 'type', 'description', 'actions'];
  constructor(private router: Router, private dataService: DataService, private _uiUtils: UIUtils) { }

  ngOnInit(): void {
    if (!this.buildServers) {
      this.buildServers = this.dataService.getBuildServers();
    }
  }

  addBuildServer() {
    this.router.navigate(['/build-server', {mode: "new"}]);
  }

  edit(id: any) {
    this.router.navigate(['/build-server', {mode: "edit", id: id}]);
  }

  getTypeDisplayValue(type: BuildServerType) {
    return BuildServerType[type].toString();
  }
  getName(server: BuildServer){
    return this._uiUtils.getBuildServerName(server);
  }
}
