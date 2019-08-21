import { Component, OnInit } from '@angular/core';

import { EntryService } from '../service/Entry.service';
import { EntryModel } from '../model/Entry.model';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss'],
  preserveWhitespaces: true
})
export class EntryListComponent implements OnInit {
  entries$: Observable<EntryModel[]>;

  constructor(private entryService: EntryService) {}

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.entries$ = this.entryService.getEntries().pipe(
      catchError(error => {
        console.error('Ocorreu um erro ao buscar pagamentos.', error);
        return EMPTY;
      })
    );
  }

  onDelete(Entry: EntryModel) {
    const confirma = confirm(`Excluir a pagamento '${Entry.name}'?`);

    if (confirma) {
      this.entryService.deleteEntry(Entry.id).subscribe(
        success => {
          console.log(`Categoria ${Entry.name} removido!`);
          this.onRefresh();
        },
        error => {
          console.error(`Erro ao remover pagamento. Tente mais tarde!`);
        }
      );
    }
  }
}
