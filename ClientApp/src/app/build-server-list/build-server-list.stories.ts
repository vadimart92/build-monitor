import {moduleMetadata, storiesOf} from '@storybook/angular';
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {BuildServer, BuildServerType} from "../data-contracts";
import {RouterTestingModule} from "@angular/router/testing";
import {BuildServerListComponent} from "./build-server-list.component";

const buildServers: BuildServer[] = [
  {id: "1", type: BuildServerType.TeamCity, name: 'Hydrogen', description: "Core", config: "..."},
  {id: "2", type: BuildServerType.TeamCity, name: 'Helium', description: "Core 1", config: "..."},
  {id: "3", type: BuildServerType.TeamCity, name: 'Lithium', description: "some", config: "..."},
  {id: "4", type: BuildServerType.TeamCity, name: 'Beryllium', description: "asdsad", config: "..."}
];

const router = RouterTestingModule.withRoutes(
  [{path: '**', component: BuildServerListComponent}]
)

storiesOf('Build server list component', module)
  .addDecorator(
    moduleMetadata({
      imports: [MatCardModule, MatTableModule, MatButtonModule, MatIconModule, router]
    })
  )
  .add('Simple', () => ({
    component: BuildServerListComponent,
    props: {
      buildServers: buildServers
    }
  }));
