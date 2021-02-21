import { storiesOf, moduleMetadata } from '@storybook/angular';
import {BuildDateInfoComponent} from '../build-date-info/build-date-info.component';
import { TcBuildInfoComponent } from './tc-build-info.component';
import {BuildStatus, Change, TcBuildInfo, User} from '../data-contracts';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ProfileInfoService} from '../data-services/profile-info.service';
import {from} from 'rxjs';

storiesOf('TC build info', module)
  .addDecorator(
    moduleMetadata({
      declarations: [BuildDateInfoComponent],
      imports: [MatCardModule, MatButtonModule, MatIconModule],
      providers: [
        {
          provide: ProfileInfoService,
          useValue: {
            getBuildInfo: () => from([]),
            unsubscribeFromBuildInfo: () => {}
          }
        }
      ]
    })
  )
  .add('Failed', () => ({
    component: TcBuildInfoComponent,
    props: {
      buildInfo: <TcBuildInfo>{
        id: 'ApiTests|4189',
        name: 'API Tests|trunk',
        projectName: 'Continuous Integration / API Tests',
        number: '4189',
        status: BuildStatus.Failed,
        statusText: 'OK',
        url: 'http://tsbuild-app-03/viewLog.html?buildId=3245558&buildTypeId=ApiTests',
        startedBy: 'subversion',
        startedOn: new Date(),
        completedOn: new Date(),
        changes: [
          <Change>{author: <User>{name: 'v.artemchuk', avatarImage: ''}},
          <Change>{author: <User>{name: 'ciadmin', avatarImage: ''}},
          <Change>{author: <User>{name: 'bpmbuild', avatarImage: ''}}
        ]
      }
    }
  }))
  .add('Success', () => ({
    component: TcBuildInfoComponent,
    props: {
      buildInfo: <TcBuildInfo>{
        id: 'testServer_buildmonitor_testfail_22a57c28-203f-440d-b028-bf15229cf999',
        name: 'API Tests|trunk',
        number: '4189',
        status: BuildStatus.Success,
        statusText: 'Success',
        url: 'http://localhost:8111/viewLog.html?buildId=114&buildTypeId=BuildMonitor_TestFail',
        startedBy: 'sa',
        startedOn: new Date('2020-05-31T02:32:23+03:00'),
        completedOn: new Date('2020-05-31T02:35:33+03:00'),
        projectName: 'Continuous Integration / API Tests',
        changes: [
          <Change>{author: <User>{name: 'v.artemchuk', avatarImage: ''}}
        ]
      }
    }
  }));
