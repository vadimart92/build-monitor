import {moduleMetadata, storiesOf} from '@storybook/angular';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {FlexLayoutModule} from '@angular/flex-layout';
import {FlexModule} from '@angular/flex-layout/flex';
import {GridModule} from '@angular/flex-layout/grid';

import {
  BuildScreenData,
  BuildData,
  BuildStatus,
  BuildViewType,
  Change,
  Screen,
  ScreenType,
  TcBuildInfo,
  User
} from '../data-contracts';
import {BuildScreenComponent} from './build-screen.component';
import {TcBuildInfoComponent} from '../tc-build-info/tc-build-info.component';
import {BuildDateInfoComponent} from '../build-date-info/build-date-info.component';

storiesOf('Build screen', module)
  .addDecorator(
    moduleMetadata({
      declarations: [TcBuildInfoComponent, BuildDateInfoComponent],
      imports: [MatCardModule, MatButtonModule, MatIconModule, FlexLayoutModule, FlexModule, GridModule],
    })
  )
  .add('Simple', () => ({
    component: BuildScreenComponent,
    props: {
      screen: <Screen>({
        id: 'xx',
        type: ScreenType.BuildInfo,
        data: <BuildScreenData>{
          builds: [
            <BuildData>({
              viewType: BuildViewType.TeamCity,
              config: <TcBuildInfo>({
                id: 'ApiTests|4189',
                name: 'API Tests|trunk',
                projectName: 'Continuous Integration / API Tests',
                number: '4189',
                status: BuildStatus.Failed,
                url: 'http://tsbuild-app-03/viewLog.html?buildId=3245558&buildTypeId=ApiTests',
                changes: [
                  <Change>{author: <User>{name: 'v.artemchuk', avatarImage: ''}}
                ]
              })
            }),
            <BuildData>({
              viewType: BuildViewType.TeamCity,
              config: <TcBuildInfo>({
                id: 'ApiTests|4189',
                name: 'API Tests|trunk',
                projectName: 'Continuous Integration / API Tests',
                number: '4189',
                status: BuildStatus.Success,
                url: 'http://tsbuild-app-03/viewLog.html?buildId=3245558&buildTypeId=ApiTests',
                changes: [
                  <Change>{author: <User>{name: 'v.artemchuk', avatarImage: ''}}
                ]
              })
            }),
            <BuildData>({
              viewType: BuildViewType.TeamCity,
              config: <TcBuildInfo>({
                id: 'ApiTests|4189',
                name: 'API Tests|trunk',
                projectName: 'Continuous Integration / API Tests',
                number: '4189',
                status: BuildStatus.Failed,
                url: 'http://tsbuild-app-03/viewLog.html?buildId=3245558&buildTypeId=ApiTests',
                changes: [
                  <Change>{author: <User>{name: 'v.artemchuk', avatarImage: ''}}
                ]
              })
            }),
          ]
        }
      })
    }
  }));
