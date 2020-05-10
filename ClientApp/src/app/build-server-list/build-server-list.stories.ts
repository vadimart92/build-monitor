import {moduleMetadata, storiesOf} from '@storybook/angular';
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {BuildServer, BuildServerType} from "../data-contracts";
import {RouterTestingModule} from "@angular/router/testing";
import {BuildServerListComponent} from "./build-server-list.component";
import {UIUtils} from "../uiutils";

const buildServers: BuildServer[] = [
  <BuildServer>{type: BuildServerType.TeamCity, description: "Core", config: {name: "1"}},
  <BuildServer>{type: BuildServerType.TeamCity, description: "Core 1", config: {name: "2"}},
  <BuildServer>{type: BuildServerType.TeamCity, description: "some", config: {name: "3"}},
  <BuildServer>{type: BuildServerType.TeamCity, description: "asdsad", config: {name: "4"}}
];

const router = RouterTestingModule.withRoutes(
  [{path: '**', component: BuildServerListComponent}]
)

storiesOf('Build server list component', module)
  .addDecorator(
    moduleMetadata({
      imports: [MatCardModule, MatTableModule, MatButtonModule, MatIconModule, router],
      providers: [UIUtils]
    })
  )
  .add('Simple', () => ({
    component: BuildServerListComponent,
    props: {
      buildServers: buildServers
    }
  }));
