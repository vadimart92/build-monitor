import {Injectable} from "@angular/core";
import {ProfileService} from "./profile.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UICrudService} from "./ui-crud-service";
import {Profile} from "../data-contracts";

@Injectable({
  providedIn: 'root',
  deps: [ProfileService, MatSnackBar],
  useFactory: (service: ProfileService, snackBar: MatSnackBar) => {
    return new UIProfileService(service, "profile", snackBar);
  }
})
export class UIProfileService extends UICrudService<Profile>{
}
