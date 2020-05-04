import { storiesOf, moduleMetadata } from '@storybook/angular';
import { TcBuildInfoComponent } from './tc-build-info.component';
import {BuildStatus, Change, TcBuildInfo, User} from "../data-contracts";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

storiesOf('TC build info', module)
  .addDecorator(
    moduleMetadata({
      imports: [MatCardModule, MatButtonModule, MatIconModule],
    })
  )
  .add('Failed', () => ({
    component: TcBuildInfoComponent,
    props: {
      buildConfig: {
        id: "ApiTests|4189",
        name: "API Tests|trunk",
        projectName: "Continuous Integration / API Tests",
        number: "4189",
        status: BuildStatus.Failed,
        url: "http://tsbuild-app-03/viewLog.html?buildId=3245558&buildTypeId=ApiTests",
        changes: [
          <Change>{author: <User>{name: "v.artemchuk", avatarImage: ""}}
        ]
      }
    }
  }))
  .add('Success', () => ({
    component: TcBuildInfoComponent,
    props: {
      buildConfig: {
        id: "ApiTests|4189",
        name: "API Tests|trunk",
        projectName: "Continuous Integration / API Tests",
        number: "4189",
        status: BuildStatus.Success,
        url: "http://tsbuild-app-03/viewLog.html?buildId=3245558&buildTypeId=ApiTests",
        changes: [
          <Change>{author: <User>{name: "v.artemchuk", avatarImage: ""}}
        ]
      }
    }
  }));
