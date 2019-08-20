import { Component, OnInit } from '@angular/core'

import { CategoryService } from '../service/category.service'
import { CategoryModel } from '../model/category.model'
import { Observable, EMPTY } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  preserveWhitespaces: true
})
export class CategoryListComponent implements OnInit {
  categories$: Observable<CategoryModel[]>

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.onRefresh()
  }

  onRefresh() {
    this.categories$ = this.categoryService.getCategories().pipe(
      catchError(error => {
        console.error('Ocorreu um erro ao buscar categorias.', error)
        return EMPTY
      })
    )
  }

  onDelete(category: CategoryModel) {
    const confirma = confirm(`Excluir a categoria '${category.name}'?`)

    if (confirma) {
      this.categoryService.deleteCategory(category.id).subscribe(
        success => {
          console.log(`Categoria ${category.name} removido!`)
          this.onRefresh()
        },
        error => {
          console.error(`Erro ao remover categoria. Tente mais tarde!`)
        }
      )
    }
  }
}
