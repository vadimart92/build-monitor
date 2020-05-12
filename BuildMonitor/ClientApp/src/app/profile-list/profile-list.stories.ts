import { storiesOf, moduleMetadata } from '@storybook/angular';
import {ProfileListComponent} from './profile-list.component';
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {Profile} from "../data-contracts";
import {RouterTestingModule} from "@angular/router/testing";
import {DataService} from "../data.service";
import {from} from "rxjs";

const profiles: Profile[] = [
  <Profile>{name: 'Hydrogen', description: "Core", public: true, config: {}},
  <Profile>{name: 'Helium', description: "Core 1", config: {}}
];

const router = RouterTestingModule.withRoutes(
  [{path: '**', component: ProfileListComponent}]
)

storiesOf('Profile list component', module)
  .addDecorator(
    moduleMetadata({
      imports: [MatCardModule, MatTableModule, MatButtonModule, MatIconModule, router],
      providers: [
        {
          provide: DataService,
          useValue: {getProfiles: ()=> (from([profiles]))}
        }
      ]
    })
  )
  .add('Simple', () => ({
    component: ProfileListComponent
  }));
