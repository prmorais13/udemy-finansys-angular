import { Component } from '@angular/core';

import { EntryService } from '../service/entry.service';
import { EntryModel } from '../model/entry.model';
import { BaseResourceListComponent } from '../../../shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss'],
  preserveWhitespaces: true
})
export class EntryListComponent extends BaseResourceListComponent<EntryModel> {
  constructor(private entryService: EntryService) {
    super(entryService, 'o Lançamento:');
  }
  // entries$: Observable<EntryModel[]>;

  // constructor(private entryService: EntryService) {}

  // ngOnInit() {
  //   this.onRefresh();
  // }

  // onRefresh() {
  //   this.entries$ = this.entryService.getEntries().pipe(
  //     map(entries => entries.sort((a, b) => b.id - a.id)),
  //     catchError(error => {
  //       console.error('Ocorreu um erro ao buscar pagamentos.', error);
  //       return EMPTY;
  //     })
  //   );
  // }

  // onDelete(Entry: EntryModel) {
  //   const confirma = confirm(`Excluir a pagamento '${Entry.name}'?`);

  //   if (confirma) {
  //     this.entryService.deleteResource(Entry.id).subscribe(
  //       success => {
  //         console.log(`Categoria ${Entry.name} removido!`);
  //         this.onRefresh();
  //       },
  //       error => {
  //         console.error(`Erro ao remover pagamento. Tente mais tarde!`);
  //       }
  //     );
  //   }
  // }
}
