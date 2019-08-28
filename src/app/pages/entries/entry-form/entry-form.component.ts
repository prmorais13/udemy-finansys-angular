import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import * as toastr from 'toastr';

import { EntryModel } from '../model/entry.model';
import { EntryService } from '../service/entry.service';
import { CategoryModel } from './../../categories/model/category.model';
import { CategoryService } from '../../categories/service/category.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {
  entryForm: FormGroup;
  entry = new EntryModel();
  categories$: Observable<CategoryModel[]>;
  currentAction: string;
  pageTitle: string;
  serverErrorsMessages: string[] = null;
  submittingForm = false;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  ptBr = {
    firstDayOfWeek: 0,
    dayNames: [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado'
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Quin', 'Sex', 'Sab'],
    dayNamesMin: ['D', 'M', 'T', 'Q', 'Q', 'S', 'S'],
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ],
    monthNamesShort: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez'
    ],
    today: 'Hoje',
    clear: 'Limpar'
  };

  constructor(
    private entryService: EntryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
    this.loadCategories();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction === 'new') {
      this.createEntry();
    } else {
      this.updateEntry();
    }
  }

  get typeOptions(): Array<any> {
    return Object.entries(EntryModel.types).map(([value, text]) => {
      return {
        text,
        value
      };
    });
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
      type: ['expense', [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]]
    });
  }

  private loadEntry() {
    if (this.currentAction === 'edit') {
      this.activatedRoute.paramMap
        .pipe(
          switchMap(params => this.entryService.getResource(params.get('id')))
        )
        .subscribe(
          data => {
            this.entry = data;
            this.entryForm.patchValue(this.entry);
          },
          error => alert('Ocorreu um erro, tente mais tarde!')
        );
    }
  }

  private loadCategories() {
    this.categories$ = this.categoryService.getResources();
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
      .createResource(entry)
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
