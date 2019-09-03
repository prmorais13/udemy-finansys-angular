import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { CategoryService } from '../../categories/service/category.service';
import { EntryModel } from '../model/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<EntryModel> {
  // private readonly BASE_URL = 'api/entries';
  // private readonly BASE_URI = 'http://localhost:3000/entries';

  constructor(
    protected injector: Injector,
    private categoryService: CategoryService
  ) {
    super('http://localhost:3000/entries', injector, EntryModel.fromJson);
  }

  // getEntries(): Observable<EntryModel[]> {
  //   return this.http.get<EntryModel[]>(this.BASE_URI).pipe(
  //     catchError(this.handleError),
  //     map(this.jsonDataToResources)
  //   );
  // }

  // getResource(id: number | string): Observable<ResourceModel> {
  //   return this.http
  //     .get<ResourceModel>(`${this.BASE_URI}/${id}`)
  //     .pipe(catchError(this.handleError));
  // }

  createResource(entry: EntryModel): Observable<EntryModel> {
    return this.setCategorySendToServer(entry, super.createResource.bind(this));
    // return this.categoryService.getResource(entry.categoryId).pipe(
    //   flatMap(category => {
    //     entry.category = category;
    //     return super.createResource(entry);
    //     return this.http
    //       .post<EntryModel>(this.BASE_URI, entry)
    //       .pipe(catchError(this.handleError));
    //   })
    // );
  }

  updateResource(entry: EntryModel): Observable<EntryModel> {
    return this.setCategorySendToServer(entry, super.updateResource.bind(this));
    // return this.categoryService.getResource(entry.categoryId).pipe(
    //   flatMap(category => {
    //     entry.category = category;
    //     return super.updateResource(entry);
    //     return this.http
    //       .put<EntryModel>(`${this.BASE_URI}/${entry.id}`, entry)
    //       .pipe(
    //         catchError(this.handleError),
    //         map(() => entry)
    //       );
    //   })
    // );
  }

  // deleteResource(id: number | string) {
  //   return this.http
  //     .delete(`${this.BASE_URI}/${id}`)
  //     .pipe(catchError(this.handleError));
  // }

  // private handleError(error: any): Observable<any> {
  //   console.log('Erro na requisição!', error);
  //   return throwError(error);
  // }

  // private jsonDataToResources(jsonData: any[]): EntryModel[] {
  //   const entries: EntryModel[] = [];

  //   jsonData.forEach(el => {
  //     // const entry = Object.assign(new EntryModel(), el);
  //     const entry = EntryModel.fromJson(el);
  //     entries.push(entry);
  //   });

  //   return entries;
  // }

  private setCategorySendToServer(
    entry: EntryModel,
    sendFn: any
  ): Observable<any> {
    return this.categoryService.getResource(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return sendFn(entry);
      })
    );
  }
}
