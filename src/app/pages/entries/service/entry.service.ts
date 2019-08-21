import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EntryModel } from '../model/entry.model';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private readonly BASE_URL = 'api/entries';
  private readonly BASE_URI = 'http://localhost:3000/entries';

  constructor(private http: HttpClient) {}

  // getEntries(): Observable<EntryModel[]> {
  //   return this.http
  //     .get<EntryModel[]>(this.BASE_URI)
  //     .pipe(catchError(this.handleError));
  // }

  getEntries(): Observable<EntryModel[]> {
    return this.http.get<EntryModel[]>(this.BASE_URI).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    );
  }

  private jsonDataToEntries(jsonData: any[]): EntryModel[] {
    const entries: EntryModel[] = [];

    jsonData.forEach(el => {
      const entry = Object.assign(new EntryModel(), el);
      entries.push(entry);
    });

    return entries;
  }

  getEntry(id: number | string): Observable<EntryModel> {
    return this.http
      .get<EntryModel>(`${this.BASE_URI}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createEntry(entry: EntryModel): Observable<EntryModel> {
    return this.http
      .post<EntryModel>(this.BASE_URI, entry)
      .pipe(catchError(this.handleError));
  }

  updateEntry(entry: EntryModel): Observable<EntryModel> {
    return this.http
      .put<EntryModel>(`${this.BASE_URI}/${entry.id}`, entry)
      .pipe(
        catchError(this.handleError),
        map(() => entry)
      );
  }

  deleteEntry(id: number | string) {
    return this.http
      .delete(`${this.BASE_URI}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<any> {
    console.log('Erro na requisição!', error);
    return throwError(error);
  }
}