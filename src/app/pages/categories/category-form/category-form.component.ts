import { Component, OnInit, AfterContentChecked } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { CategoryModel } from '../model/category.model'
import { CategoryService } from '../service/category.service'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {
  categoryForm: FormGroup
  category = new CategoryModel(null, null, null)
  currentAction: string
  pageTitle: string
  serverErrorsMessages: string[] = null
  submittingForm: boolean = false

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.setCurrentAction()
    this.buildCategoryForm()
    this.loadCategory()
  }

  ngAfterContentChecked(): void {
    this.setPageTitle()
  }

  private setCurrentAction() {
    if (this.activatedRoute.snapshot.url[0].path === 'new') {
      this.currentAction = 'new'
    } else {
      this.currentAction = 'edit'
    }
  }

  private buildCategoryForm() {
    this.categoryForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(6)]],
      description: [null]
    })
  }

  private loadCategory() {
    if (this.currentAction === 'edit') {
      this.activatedRoute.paramMap
        .pipe(
          switchMap(params =>
            this.categoryService.getCategory(params.get('id'))
          )
        )
        .subscribe(
          data => {
            this.category = data
            this.categoryForm.patchValue(this.category)
          },
          error => alert('Ocorreu um erro, tente mais tarde!')
        )
    }
  }

  private setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de Categoria'
    } else {
      this.pageTitle = `Editando Categoria: ${this.category.name || ''}`
    }
  }
}
