import {ICrudService} from "./base-crud.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

export class UICrudService<TEntity> implements ICrudService<TEntity>  {
  constructor(private _service: ICrudService<TEntity>, private entityDesc: string, private _snackBar: MatSnackBar, private _nameFormatter?: Function ) {
    this._nameFormatter = _nameFormatter ?? this.getEntityName;
  }
  private _showErr(msg: string){
    this._showMsg(msg, 15000);
  }
  private _showMsg(msg: string, duration?: number){
    this._snackBar.open(msg, null, <MatSnackBarConfig<any>>{
      duration: duration ?? 2000
    });
  }

  get(id: string): Observable<TEntity> {
    return this._service.get(id).pipe(
      catchError(err => {
        this._showErr(`Error while requesting ${this.entityDesc} with id ${id}: ${err.statusText}.`);
        return throwError(err);
      }));
  }

  getAll(): Observable<TEntity[]> {
    return this._service.getAll().pipe(
      catchError(err => {
        this._showErr(`Error while requesting ${this.entityDesc}: ${err.statusText}.`);
        return throwError(err);
      }));
  }

  async remove(id: string): Promise<object> {
    const result = await this._service.remove(id);
    this._showMsg(`Removed ${this.entityDesc} ${id}.`);
    return result;
  }

  protected getEntityName(entity: TEntity){
    return (<any>entity).name;
  }
  async save(entity: TEntity): Promise<object> {
    const result = await this._service.save(entity);
    this._showMsg(`Saved ${this.entityDesc} ${this._nameFormatter(entity)}.`);
    return result;
  }

  createSample(): TEntity {
    return this._service.createSample();
  }
}

