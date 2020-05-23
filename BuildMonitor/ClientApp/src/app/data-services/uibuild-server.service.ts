import {Injectable} from "@angular/core";
import {BuildServerService} from "./build-server.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UICrudService} from "./ui-crud-service";
import {BuildServer} from "../data-contracts";

@Injectable({
  providedIn: 'root',
  deps: [BuildServerService, MatSnackBar],
  useFactory: (service: BuildServerService, snackBar: MatSnackBar) => {
    return new UIBuildServerService(service, "build server", snackBar);
  },
})
export class UIBuildServerService extends UICrudService<BuildServer> {

}
