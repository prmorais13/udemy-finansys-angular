import { OnInit } from '@angular/core';

import { Observable, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import * as toastr from 'toastr';

import { BaseResourceService } from '../../services/base-resource.service';
import { BaseResourceModel } from '../../models/base-resource.model';

export abstract class BaseResourceListComponent<T extends BaseResourceModel>
  implements OnInit {
  resources$: Observable<T[]>;

  constructor(
    private resourceService: BaseResourceService<T>,
    private msg: string
  ) {}

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.resources$ = this.resourceService.getResources().pipe(
      map(resources => resources.sort((a, b) => b.id - a.id)),
      // map(r => this.jsonDataToResources(r)),
      catchError(error => {
        console.error('Ocorreu um erro ao buscar dados.', error);
        return EMPTY;
      })
    );
  }

  // onRefresh() {
  //   this.resources$ = this.resourceService.getResources().pipe(
  //     map(resources => resources.sort((a, b) => b.id - a.id)),
  //     catchError(error => {
  //       console.error('Ocorreu um erro ao buscar dados.', error);
  //       return EMPTY;
  //     })
  //   );
  // }

  // private jsonDataToResources(jsonData: any[]): T[] {
  //   const resources: T[] = [];

  //   jsonData.forEach(el => {
  //     const resource = this.jsonDataToResourceFn(el);
  //     resources.push(resource);
  //   });

  //   return resources;
  // }

  onDelete(resource: T) {
    const confirma = confirm(
      `Excluir ${this.msg} '${resource.name.toUpperCase()}'?`
    );

    if (confirma) {
      this.resourceService.deleteResource(resource.id).subscribe(
        () => {
          // console.log(`${this.msg} ${resource.name} removido!`);
          toastr.info(
            `${this.msg} ${resource.name.toUpperCase()} foi removido!`,
            'Exclusão',
            {
              timeOut: 3000
            }
          );

          this.onRefresh();
        },
        error => {
          // console.error(`Erro ao remover ${this.msg}. Tente mais tarde!`);
          toastr.error(
            `Erro ao remover ${this.msg.toUpperCase()}. Tente mais tarde!`,
            'Exclusão',
            {
              timeOut: 3000
            }
          );
        }
      );
    }
  }
}
