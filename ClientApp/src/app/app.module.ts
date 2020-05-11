import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuildScreenComponent } from './build-screen/build-screen.component';
import { TcBuildInfoComponent } from './tc-build-info/tc-build-info.component';
import {ScreenListComponent} from "./screen-list/screen-list.component";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {FlexLayoutModule} from '@angular/flex-layout';
import {FlexModule} from '@angular/flex-layout/flex';
import {GridModule} from '@angular/flex-layout/grid';

import {MonacoEditorModule, NgxMonacoEditorConfig} from 'ngx-monaco-editor';

import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { BuildServerListComponent } from './build-server-list/build-server-list.component';
import { BuildServerEditComponent } from './build-server-edit/build-server-edit.component';
import {UIUtils} from "./uiutils";
import { BaseBuildInfoComponent } from './base-build-info/base-build-info.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ScreenListComponent,
    BuildScreenComponent,
    TcBuildInfoComponent,
    ProfileListComponent,
    ProfileEditComponent,
    BuildServerListComponent,
    BuildServerEditComponent,
    BaseBuildInfoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'counter', component: CounterComponent},
      {path: 'fetch-data', component: FetchDataComponent},
      {path: 'view/:profile', component: ScreenListComponent},
      {path: 'profile-list', component: ProfileListComponent},
      {path: 'profile', component: ProfileEditComponent},
      {path: 'build-server-list', component: BuildServerListComponent},
      {path: 'build-server', component: BuildServerEditComponent},
    ]),
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    FlexLayoutModule, FlexModule, GridModule,
    MonacoEditorModule.forRoot()
  ],
  providers: [
    UIUtils
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
