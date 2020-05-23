import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {BuildScreenData, BuildViewType, Screen} from "../data-contracts";

@Component({
  selector: 'app-build-monitor',
  templateUrl: './build-screen.component.html',
  styleUrls: ['./build-screen.component.css']
})
export class BuildScreenComponent implements OnInit {
  public buildViewType = BuildViewType;
  @Input() screen: Screen;
  buildScreenData: BuildScreenData;
  constructor() { }

  ngOnInit(): void {
    this.buildScreenData = this.screen.data as BuildScreenData;
  }

}
