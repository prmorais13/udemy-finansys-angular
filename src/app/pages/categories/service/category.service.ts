import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CategoryModel } from '../model/category.model';
import { Observable, throwError } from 'rxjs';
import { take, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly BASE_URL = 'api/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.BASE_URL);
  }

  getCategory(id: number | string): Observable<CategoryModel> {
    return this.http
      .get<CategoryModel>(`${this.BASE_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.http
      .post<CategoryModel>(this.BASE_URL, category)
      .pipe(catchError(this.handleError));
  }

  updateCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.http
      .put<CategoryModel>(`${this.BASE_URL}/${category.id}`, category)
      .pipe(
        catchError(this.handleError),
        map(() => category)
      );
  }

  deleteCategory(id: number | string) {
    return this.http
      .delete(`${this.BASE_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<any> {
    console.log('Erro na requisição!', error);
    return throwError(error);
  }
}
