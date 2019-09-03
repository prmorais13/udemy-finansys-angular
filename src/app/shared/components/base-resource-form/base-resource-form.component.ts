import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import * as toastr from 'toastr';

import { BaseResourceService } from '../../services/base-resource.service';
import { BaseResourceModel } from '../../models/base-resource.model';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel>
  implements OnInit, AfterContentChecked {
  resourceForm: FormGroup;
  currentAction: string;
  pageTitle: string;
  serverErrorsMessages: string[] = null;
  submittingForm = false;

  protected activatedRoute: ActivatedRoute;
  protected router: Router;
  protected fb: FormBuilder;

  constructor(
    protected injector: Injector,
    protected baseResourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData: any) => T,
    public resource: T,
    protected msg: string
  ) {
    this.router = this.injector.get(Router);
    this.activatedRoute = this.injector.get(ActivatedRoute);
    this.fb = this.injector.get(FormBuilder);
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  protected abstract buildResourceForm(): void;

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction === 'new') {
      this.createResource();
    } else {
      this.updateResource();
    }
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  protected setCurrentAction() {
    if (this.activatedRoute.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  protected loadResource() {
    if (this.currentAction === 'edit') {
      this.activatedRoute.paramMap
        .pipe(
          switchMap(params =>
            this.baseResourceService.getResource(params.get('id'))
          )
        )
        .subscribe(
          data => {
            this.resource = data;
            this.resourceForm.patchValue(this.resource);
          },
          error => alert('Ocorreu um erro, tente mais tarde!')
        );
    }
  }

  protected setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = this.creationPageTitle();
    } else {
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected editionPageTitle(): string {
    return 'Edição';
  }

  protected creationPageTitle(): string {
    return 'Novo';
  }

  protected createResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.baseResourceService
      .createResource(resource)
      .subscribe(
        resResource => this.actionFormSuccess(resResource),
        error => this.actionFormError(error)
      );
  }

  protected updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.baseResourceService
      .updateResource(resource)
      .subscribe(
        resResource => this.actionFormSuccess(resResource),
        error => this.actionFormError(error)
      );
  }

  protected actionFormSuccess(resource: T) {
    toastr.success(
      `${this.msg} ${this.resource.name.toUpperCase()} salva com sucesso!`,
      'Sucesso',
      {
        timeOut: 1500
      }
    );

    const baseComponentPath: string = this.activatedRoute.snapshot.parent.url[0]
      .path;

    this.router
      .navigateByUrl(baseComponentPath, { skipLocationChange: true })
      .then(() =>
        this.router.navigate([baseComponentPath, resource.id, 'edit'])
      );
  }

  protected actionFormError(error: any) {
    toastr.error(
      `Erro ao salvar ${
        this.msg
      } ${this.resource.name.toUpperCase()}!. Tente mais tarde.`,
      'Erro Servidor',
      { timeOut: 1500 }
    );
    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorsMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorsMessages = [
        'Ocorreu um erro inesperado. Tente novamente!'
      ];
    }
  }
}
