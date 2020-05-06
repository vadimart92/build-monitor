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

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

  constructor(private router: Router, private monitorService: DataService) { }

  ngOnInit(): void {
    if (!this.profiles) {
      this.profiles = this.monitorService.getProfiles();
    }
  }

  view(name: any) {
    this.router.navigate([`/monitor-view/${name}`]);
  }
  addProfile(){
    this.router.navigate(['/profile', {mode: "new"}]);
  }

}
