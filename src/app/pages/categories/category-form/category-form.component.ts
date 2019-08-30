import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { CategoryModel } from '../model/category.model';
import { CategoryService } from '../service/category.service';
import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent extends BaseResourceFormComponent<
  CategoryModel
> {
  // Form: FormGroup;
  // category = new CategoryModel();
  // currentAction: string;
  // pageTitle: string;
  // serverErrorsMessages: string[] = null;
  // submittingForm = false;

  constructor(
    protected categoryService: CategoryService,
    protected injector: Injector
  ) {
    super(
      injector,
      categoryService,
      CategoryModel.fromJson,
      new CategoryModel()
    );
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(4)]],
      description: [null]
    });
  }

  protected editionPageTitle(): string {
    const name = this.resource.name;
    return `Editando Categoria: ${name}`;
  }

  protected creationPageTitle(): string {
    return 'Cadastro de Nova Categoria';
  }

  // ngOnInit() {
  //   this.setCurrentAction();
  //   this.buildCategoryForm();
  //   this.loadCategory();
  // }

  // submitForm() {
  //   this.submittingForm = true;

  //   if (this.currentAction === 'new') {
  //     this.createCategory();
  //   } else {
  //     this.updateCategory();
  //   }
  // }

  // ngAfterContentChecked(): void {
  //   this.setPageTitle();
  // }

  // private setCurrentAction() {
  //   if (this.activatedRoute.snapshot.url[0].path === 'new') {
  //     this.currentAction = 'new';
  //   } else {
  //     this.currentAction = 'edit';
  //   }
  // }

  // private loadCategory() {
  //   if (this.currentAction === 'edit') {
  //     this.activatedRoute.paramMap
  //       .pipe(
  //         switchMap(params =>
  //           this.categoryService.getResource(params.get('id'))
  //         )
  //       )
  //       .subscribe(
  //         data => {
  //           this.category = data;
  //           this.categoryForm.patchValue(this.category);
  //         },
  //         error => alert('Ocorreu um erro, tente mais tarde!')
  //       );
  //   }
  // }

  // private setPageTitle() {
  //   if (this.currentAction === 'new') {
  //     this.pageTitle = 'Cadastro de Categoria';
  //   } else {
  //     this.pageTitle = `Editando Categoria: ${this.category.name || ''}`;
  //   }
  // }

  // private createCategory() {
  //   const category: CategoryModel = Object.assign(
  //     new CategoryModel(),
  //     this.categoryForm.value
  //   );
  //   this.categoryService
  //     .createResource(category)
  //     .subscribe(
  //       resCategory => this.actionFormSuccess(resCategory),
  //       error => this.actionFormError(error)
  //     );
  // }

  // private updateCategory() {
  //   const category: CategoryModel = Object.assign(
  //     new CategoryModel(),
  //     this.categoryForm.value
  //   );
  //   this.categoryService
  //     .updateResource(category)
  //     .subscribe(
  //       resCategory => this.actionFormSuccess(resCategory),
  //       error => this.actionFormError(error)
  //     );
  // }

  // private actionFormSuccess(category: CategoryModel) {
  //   toastr.success('Solicitação processada com sucesso!', 'Sucesso', {
  //     timeOut: 1500
  //   });
  //   this.router
  //     .navigateByUrl('categories', { skipLocationChange: true })
  //     .then(() => this.router.navigate(['categories', category.id, 'edit']));
  // }

  // private actionFormError(error: any) {
  //   toastr.error(
  //     'Ocorreu um erro ao processar sua solicitação!',
  //     'Erro Servidor',
  //     { timeOut: 1500 }
  //   );
  //   this.submittingForm = false;

  //   if (error.status === 422) {
  //     this.serverErrorsMessages = JSON.parse(error._body).errors;
  //   } else {
  //     this.serverErrorsMessages = [
  //       'Ocorreu um erro inesperado. Tente novamente!'
  //     ];
  //   }
  // }
}
