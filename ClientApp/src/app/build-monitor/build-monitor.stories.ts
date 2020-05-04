import {moduleMetadata, storiesOf} from '@storybook/angular';

import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {FlexLayoutModule} from '@angular/flex-layout';
import {FlexModule} from '@angular/flex-layout/flex';
import {GridModule} from '@angular/flex-layout/grid';

import {
  BuildConfigItem,
  BuildMonitorConfig,
  BuildStatus,
  BuildViewType, Change,
  MonitorItem, TcBuildInfo, User
} from "../data-contracts";
import {BuildMonitorComponent} from "./build-monitor.component";
import {TcBuildInfoComponent} from "../tc-build-info/tc-build-info.component";

storiesOf('Build monitor', module)
  .addDecorator(
    moduleMetadata({
      declarations: [TcBuildInfoComponent],
      imports: [MatCardModule, MatButtonModule, MatIconModule, FlexLayoutModule, FlexModule, GridModule],
    })
  )
  .add('Simple', () => ({
    component: BuildMonitorComponent,
    props: {
      monitorItem: <MonitorItem>({
        config: <BuildMonitorConfig>{
          builds: [
            <BuildConfigItem>({
              viewType: BuildViewType.TeamCity,
              config: <TcBuildInfo>({
                id: "ApiTests|4189",
                name: "API Tests|trunk",
                projectName: "Continuous Integration / API Tests",
                number: "4189",
                status: BuildStatus.Failed,
                url: "http://tsbuild-app-03/viewLog.html?buildId=3245558&buildTypeId=ApiTests",
                changes: [
                  <Change>{author: <User>{name: "v.artemchuk", avatarImage: ""}}
                ]
              })
            }),
            <BuildConfigItem>({
              viewType: BuildViewType.TeamCity,
              config: <TcBuildInfo>({
                id: "ApiTests|4189",
                name: "API Tests|trunk",
                projectName: "Continuous Integration / API Tests",
                number: "4189",
                status: BuildStatus.Success,
                url: "http://tsbuild-app-03/viewLog.html?buildId=3245558&buildTypeId=ApiTests",
                changes: [
                  <Change>{author: <User>{name: "v.artemchuk", avatarImage: ""}}
                ]
              })
            })
          ]
        }
      })
    }
  }));
