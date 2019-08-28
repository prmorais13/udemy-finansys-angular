import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseResourceModel } from '../models/base-resource.model';

export abstract class BaseResourceService<T extends BaseResourceModel> {
  protected http: HttpClient;

  constructor(protected BASE_URI: string, protected injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  getCategories(): Observable<T[]> {
    return this.http.get<T[]>(this.BASE_URI).pipe(catchError(this.handleError));
  }

  getCategory(id: number | string): Observable<T> {
    return this.http
      .get<T>(`${this.BASE_URI}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createCategory(resource: T): Observable<T> {
    return this.http
      .post<T>(this.BASE_URI, resource)
      .pipe(catchError(this.handleError));
  }

  updateCategory(resource: T): Observable<T> {
    return this.http.put<T>(`${this.BASE_URI}/${resource.id}`, resource).pipe(
      catchError(this.handleError),
      map(() => resource)
    );
  }

  deleteCategory(id: number | string) {
    return this.http
      .delete(`${this.BASE_URI}/${id}`)
      .pipe(catchError(this.handleError));
  }

  protected handleError(error: any): Observable<any> {
    console.log('Erro na requisição!', error);
    return throwError(error);
  }

  // protected jsonDataToResources(jsonData: any[]): T[] {
  //   const resources: T[] = [];

  //   jsonData.forEach(el => {
  //     const resource = Object.assign(new T(), el);
  //     resources.push(resource);
  //   });

  //   return resources;
  // }
}
