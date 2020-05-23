import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface ICrudService<TEntity> {
  getAll() : Observable<TEntity[]>;
  get(id: string) : Observable<TEntity>;
  save(entity: TEntity) : Promise<object>;
  remove(id: string) : Promise<object>;
  createSample() : TEntity;
}
export class BaseCrudService<TEntity> implements ICrudService<TEntity> {

  protected baseAddress: string;
  constructor(protected http: HttpClient, protected endpoint: string) {
    this.baseAddress = `/api/${this.endpoint}`;
  }

  getAll() : Observable<TEntity[]> {
    return this.http.get<TEntity[]>(`${this.baseAddress}/GetAll`);
  }
  get(id: string) : Observable<TEntity> {
    return this.http.get<TEntity>(`${this.baseAddress}/Get?id=${id}`);
  }
  save(entity: TEntity) : Promise<object> {
    return this.http.put(this.baseAddress, entity).toPromise();
  }
  remove(id: string) : Promise<object> {
    return  this.http.delete(`${this.baseAddress}?id=${id}`).toPromise();
  }
  createSample() : TEntity {
    return null;
  }
}

