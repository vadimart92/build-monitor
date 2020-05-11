import { storiesOf, moduleMetadata } from '@storybook/angular';
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MonacoEditorModule, NgxMonacoEditorConfig} from "ngx-monaco-editor";
import {BuildServerEditComponent} from "./build-server-edit.component";
import {UIUtils} from "../uiutils";
import {DataService} from "../data.service";
import {BuildServer, BuildServerType, Profile} from "../data-contracts";
import * as samples from "../samples.json";

const router = RouterTestingModule.withRoutes(
  [{path: '**', component: BuildServerEditComponent}]
)

storiesOf('Build server edit component', module)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatInputModule, MonacoEditorModule.forRoot(), router],
      providers: [
        UIUtils,
        {
          provide: DataService,
          useValue: {
            getBuildServer: ()=> <BuildServer>{description: "test desc", config: samples.buildServer, type: BuildServerType.TeamCity},
            createSampleBuildServer: () => <BuildServer> {
              description: "new desc",
              config: samples.buildServer,
              type: BuildServerType.TeamCity
            }
          }
        },
      ]
    })
  )
  .add('Add new', () => ({
    component: BuildServerEditComponent,
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
    component: BuildServerEditComponent,
    props: {
      isNewMode: true
    },
    moduleMetadata: {
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: convertToParamMap({mode: 'edit', name: "test"})}}
        }
      ]
    }
  }));
