import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '../../../shared/services/base-resource.service';

import { CategoryModel } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<CategoryModel> {
  // private readonly BASE_URL = 'api/categories';
  // private readonly BASE_URI = 'http://localhost:3000/categories';

  constructor(protected injector: Injector) {
    super('http://localhost:3000/categories', injector);
  }
}
