﻿import { storiesOf, moduleMetadata } from '@storybook/angular';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MonacoEditorModule} from 'ngx-monaco-editor';
import {BuildServerEditComponent} from './build-server-edit.component';
import {UIUtils} from '../uiutils';
import {BuildServer} from '../data-contracts';
import {BuildServerService} from '../data-services/build-server.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {from} from 'rxjs';
import {SampleBuildServer} from '../samples/sample-build-server';

const router = RouterTestingModule.withRoutes(
  [{path: '**', component: BuildServerEditComponent}]
);

storiesOf('Build server edit component', module)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatInputModule,
        MatProgressSpinnerModule, MatSnackBarModule, MonacoEditorModule.forRoot(), router],
      providers: [
        UIUtils,
        {
          provide: BuildServerService,
          useValue: {
            get: () => from([<BuildServer>{description: 'test desc', config: SampleBuildServer}]),
            createSample: () => <BuildServer> {
              description: 'new desc',
              config: SampleBuildServer
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
          useValue: {snapshot: {paramMap: convertToParamMap({mode: 'edit', name: 'test'})}}
        }
      ]
    }
  }));
