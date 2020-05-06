import { storiesOf, moduleMetadata } from '@storybook/angular';
import {ProfileListComponent} from './profile-list.component';
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {Profile} from "../data-contracts";
import {RouterTestingModule} from "@angular/router/testing";

const profiles: Profile[] = [
  {id: 1, name: 'Hydrogen', description: "Core", config: "..."},
  {id: 2, name: 'Helium', description: "Core 1", config: "..."},
  {id: 3, name: 'Lithium', description: "some", config: "..."},
  {id: 4, name: 'Beryllium', description: "asdsad", config: "..."}
];

const router = RouterTestingModule.withRoutes(
  [{path: '**', component: ProfileListComponent}]
)

storiesOf('Profile list component', module)
  .addDecorator(
    moduleMetadata({
      imports: [MatCardModule, MatTableModule, MatButtonModule, MatIconModule, router]
    })
  )
  .add('Simple', () => ({
    component: ProfileListComponent,
    props: {
      profiles: profiles
    }
  }));
