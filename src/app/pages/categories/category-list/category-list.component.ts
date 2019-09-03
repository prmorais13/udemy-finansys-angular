import { Component } from '@angular/core';

import { CategoryService } from '../service/category.service';
import { CategoryModel } from '../model/category.model';
import { BaseResourceListComponent } from '../../../shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  preserveWhitespaces: true
})
export class CategoryListComponent extends BaseResourceListComponent<
  CategoryModel
> {
  constructor(private categoryService: CategoryService) {
    super(categoryService, 'a Categoria:');
  }

  // categories$: Observable<CategoryModel[]>;

  // constructor(private categoryService: CategoryService) {}

  // ngOnInit() {
  //   this.onRefresh();
  // }

  // onRefresh() {
  //   this.categories$ = this.categoryService.getResources().pipe(
  //     catchError(error => {
  //       console.error('Ocorreu um erro ao buscar categorias.', error);
  //       return EMPTY;
  //     })
  //   );
  // }

  // onDelete(category: CategoryModel) {
  //   const confirma = confirm(`Excluir a categoria '${category.name}'?`);

  //   if (confirma) {
  //     this.categoryService.deleteResource(category.id).subscribe(
  //       success => {
  //         console.log(`Categoria ${category.name} removido!`);
  //         this.onRefresh();
  //       },
  //       error => {
  //         console.error(`Erro ao remover categoria. Tente mais tarde!`);
  //       }
  //     );
  //   }
  // }
}
