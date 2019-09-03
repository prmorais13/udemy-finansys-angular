import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseResourceModel } from '../models/base-resource.model';

export abstract class BaseResourceService<T extends BaseResourceModel> {
  protected http: HttpClient;

  constructor(
    protected BASE_URI: string,
    protected injector: Injector,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    this.http = injector.get(HttpClient);
  }

  getResources(): Observable<T[]> {
    return this.http.get<T[]>(this.BASE_URI).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    );
  }

  getResource(id: number | string): Observable<T> {
    return this.http
      .get<T>(`${this.BASE_URI}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createResource(resource: T): Observable<T> {
    return this.http.post<T>(this.BASE_URI, resource).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    );
  }

  updateResource(resource: T): Observable<T> {
    return this.http
      .put<T>(`${this.BASE_URI}/${resource.id}`, resource)
      .pipe(catchError(this.handleError));
  }

  deleteResource(id: number | string) {
    return this.http
      .delete(`${this.BASE_URI}/${id}`)
      .pipe(catchError(this.handleError));
  }

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];

    jsonData.forEach(el => resources.push(this.jsonDataToResourceFn(el)));

    return resources;
  }

  protected handleError(error: any): Observable<any> {
    console.log('Erro na requisição!', error);
    return throwError(error);
  }
}
