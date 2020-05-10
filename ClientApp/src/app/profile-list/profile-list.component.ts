import { Component, OnInit, Input } from '@angular/core';
import {Router} from "@angular/router";
import {Profile} from "../data-contracts";
import {DataService} from "../data.service";

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})

export class ProfileListComponent implements OnInit {
  @Input() profiles: Profile[];

  displayedColumns: string[] = ['name', 'description', 'public', 'actions'];

  constructor(private router: Router, private _dataService: DataService) { }

  ngOnInit(): void {
    if (!this.profiles) {
      this.profiles = this._dataService.getProfiles();
    }
  }

  view(name: any) {
    this.router.navigate([`/view/${name}`]);
  }
  addProfile(){
    this.router.navigate(['/profile', {mode: "new"}]);
  }

  edit(name: any) {
    this.router.navigate(['/profile', {mode: "edit", name: name}]);
  }
}
