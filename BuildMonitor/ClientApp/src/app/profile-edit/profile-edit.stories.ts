import { storiesOf, moduleMetadata } from '@storybook/angular';
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterTestingModule} from "@angular/router/testing";
import {ProfileEditComponent} from "./profile-edit.component";
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MonacoEditorModule, NgxMonacoEditorConfig} from "ngx-monaco-editor";
import {DataService} from "../data.service";
import {BuildServer, Profile} from "../data-contracts";
import {UIUtils} from "../uiutils";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import * as samples from "../samples.json";
import {SchemaService} from "../schema.service";
import {from, Observable} from "rxjs";

const router = RouterTestingModule.withRoutes(
  [{path: '**', component: ProfileEditComponent}]
)
storiesOf('Profile edit component', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        BrowserAnimationsModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatInputModule,
        MatCheckboxModule, MatProgressSpinnerModule, MonacoEditorModule.forRoot(), router
      ],
      providers: [
        {
          provide: DataService,
          useValue: {
            getProfile: ()=> <Profile>{
              name: "sample",
              description: "desc",
              config: samples.profile
            },
            getBuildServers(): Observable<BuildServer[]>{
              return from([[
                <BuildServer> {description: "test desc", config: {name: "teamcity"}},
                <BuildServer> {description: "empty desc", config: {name: "jenkins"}}
              ]])
            },
            createSampleProfile() {
              return <Profile>{
                name: "sample",
                description: "desc",
                config: samples.profile
              }
            }
          }
        },
        UIUtils
      ]
    })
  )
  .add('Add new', () => ({
    component: ProfileEditComponent,
    props: {
      isNewMode: true
    },
    moduleMetadata: {
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: convertToParamMap({mode: 'new'})}}
        }
      ]
    }
  }))
  .add('Edit', () => ({
    component: ProfileEditComponent,
    props: {
      isNewMode: true
    },
    moduleMetadata: {
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: convertToParamMap({mode: 'edit'})}}
        }
      ]
    }
  }));
