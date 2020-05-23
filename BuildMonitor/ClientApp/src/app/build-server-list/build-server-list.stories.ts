import {moduleMetadata, storiesOf} from '@storybook/angular';
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {BuildServer, BuildServerType} from "../data-contracts";
import {RouterTestingModule} from "@angular/router/testing";
import {BuildServerListComponent} from "./build-server-list.component";
import {UIUtils} from "../uiutils";
import {from} from "rxjs";
import {UIBuildServerService} from "../data-services/uibuild-server.service";

const buildServers: BuildServer[] = [
  <BuildServer>{description: "Core", config: {name: "1", type: BuildServerType.TeamCity}},
  <BuildServer>{description: "Core 1", config: {name: "2", type: BuildServerType.TeamCity}},
  <BuildServer>{description: "some", config: {name: "3", type: BuildServerType.TeamCity}},
  <BuildServer>{description: "asdsad", config: {name: "4", type: BuildServerType.TeamCity}}
];

const router = RouterTestingModule.withRoutes(
  [{path: '**', component: BuildServerListComponent}],
)

storiesOf('Build server list component', module)
  .addDecorator(
    moduleMetadata({
      imports: [MatCardModule, MatTableModule, MatButtonModule, MatIconModule, router],
      providers: [
        UIUtils,
        {
          provide: UIBuildServerService,
          useValue: {getAll: ()=> from([buildServers])}
        }
      ]
    })
  )
  .add('Simple', () => ({
    component: BuildServerListComponent
  }));
