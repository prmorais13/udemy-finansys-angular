import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import * as toastr from 'toastr';

import { EntryModel } from '../model/entry.model';
import { EntryService } from '../service/entry.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {
  entryForm: FormGroup;
  entry = new EntryModel();
  currentAction: string;
  pageTitle: string;
  serverErrorsMessages: string[] = null;
  submittingForm = false;

  constructor(
    private entryService: EntryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction === 'new') {
      this.createEntry();
    } else {
      this.updateEntry();
    }
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  private setCurrentAction() {
    if (this.activatedRoute.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private buildEntryForm() {
    this.entryForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(4)]],
      description: [null],
      type: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [null, [Validators.required]],
      categoryId: [null, [Validators.required]]
    });
  }

  private loadEntry() {
    if (this.currentAction === 'edit') {
      this.activatedRoute.paramMap
        .pipe(switchMap(params => this.entryService.getEntry(params.get('id'))))
        .subscribe(
          data => {
            this.entry = data;
            this.entryForm.patchValue(this.entry);
          },
          error => alert('Ocorreu um erro, tente mais tarde!')
        );
    }
  }

  private setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de Lançamento';
    } else {
      this.pageTitle = `Editando Lançamento: ${this.entry.name || ''}`;
    }
  }

  private createEntry() {
    const entry: EntryModel = Object.assign(
      new EntryModel(),
      this.entryForm.value
    );
    this.entryService
      .createEntry(entry)
      .subscribe(
        resEntry => this.actionFormSuccess(resEntry),
        error => this.actionFormError(error)
      );
  }

  private updateEntry() {
    const entry: EntryModel = Object.assign(
      new EntryModel(),
      this.entryForm.value
    );
    this.entryService
      .updateEntry(entry)
      .subscribe(
        resEntry => this.actionFormSuccess(resEntry),
        error => this.actionFormError(error)
      );
  }

  private actionFormSuccess(entry: EntryModel) {
    toastr.success('Solicitação processada com sucesso!', 'Sucesso', {
      timeOut: 1500
    });
    this.router
      .navigateByUrl('entries', { skipLocationChange: true })
      .then(() => this.router.navigate(['entries', entry.id, 'edit']));
  }

  private actionFormError(error: any) {
    toastr.error(
      'Ocorreu um erro ao processar sua solicitação!',
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
