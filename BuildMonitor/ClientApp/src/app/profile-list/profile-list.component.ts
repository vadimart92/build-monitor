import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Profile} from "../data-contracts";
import {Observable} from "rxjs";
import {UIProfileService} from "../data-services/uiprofile.service";

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})

export class ProfileListComponent implements OnInit {
  profiles$: Observable<Profile[]>;

  displayedColumns: string[] = ['name', 'description', 'public', 'actions'];

  constructor(private router: Router, private _profileService: UIProfileService) {
  }

  ngOnInit(): void {
    this.profiles$ = this._profileService.getAll();
  }

  view(name: any) {
    this.router.navigate([`/view/${name}`]);
  }
  addProfile(){
    this.router.navigate(['/profile', {mode: "new"}]);
  }

  edit(id: any) {
    this.router.navigate(['/profile', {mode: "edit", id: id}]);
  }

  async remove(id: any) {
    await this._profileService.remove(id);
    this.profiles$ = this._profileService.getAll();
  }
}
