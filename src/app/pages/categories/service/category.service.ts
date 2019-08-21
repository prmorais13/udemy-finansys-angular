import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CategoryModel } from '../model/category.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly BASE_URL = 'api/categories';
  private readonly BASE_URI = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.BASE_URI);
  }

  getCategory(id: number | string): Observable<CategoryModel> {
    return this.http
      .get<CategoryModel>(`${this.BASE_URI}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.http
      .post<CategoryModel>(this.BASE_URI, category)
      .pipe(catchError(this.handleError));
  }

  updateCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.http
      .put<CategoryModel>(`${this.BASE_URI}/${category.id}`, category)
      .pipe(
        catchError(this.handleError),
        map(() => category)
      );
  }

  deleteCategory(id: number | string) {
    return this.http
      .delete(`${this.BASE_URI}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<any> {
    console.log('Erro na requisição!', error);
    return throwError(error);
  }
}
