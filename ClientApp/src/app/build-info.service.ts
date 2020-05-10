import {Injectable, NgZone} from '@angular/core';
import {BuildInfo, BuildStatus, TcBuildInfo} from "./data-contracts";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BuildInfoService {
  private subjects: object = {};
  constructor(private zone:NgZone) {
    (<any>window).BuildInfoService = this;
  }
  getBuildInfo<TBuildInfo extends BuildInfo>(buildInfoId: string) : Observable<TBuildInfo>{
    if (!this.subjects[buildInfoId]){
      this.subjects[buildInfoId] = new Subject<TBuildInfo>();
    }
    return this.subjects[buildInfoId].asObservable();
  }
  refresh(){
    const info = new TcBuildInfo();
    info.id = "xxxx";
    info.name = "xxxx";
    info.number = "xxxx";
    info.status = BuildStatus.Failed
    Object.keys(this.subjects).forEach(id => {
      const subject = this.subjects[id];
      this.zone.run(() => subject.next(info));
    });
  }
}
