import { OnInit, AfterContentChecked, Injector } from '@angular/core'

import { ActivatedRoute, Router } from '@angular/router'

import { Observable, EMPTY } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import { BaseResourceService } from '../../services/base-resource.service'
import { BaseResourceModel } from '../../models/base-resource.model'

export abstract class BaseResourceListComponent<T extends BaseResourceModel>
  implements OnInit {
  resources$: Observable<T[]>

  constructor(private resourceService: BaseResourceService<T>) {}

  ngOnInit() {
    this.onRefresh()
  }

  onRefresh() {
    this.resources$ = this.resourceService.getResources().pipe(
      map(resources => resources.sort((a, b) => b.id - a.id)),
      catchError(error => {
        console.error('Ocorreu um erro ao buscar dados.', error)
        return EMPTY
      })
    )
  }

  onDelete(resurce: T) {
    const confirma = confirm(`Excluir registro '${resurce['name']}'?`)

    if (confirma) {
      this.resourceService.deleteResource(resurce.id).subscribe(
        success => {
          console.log(`Registo ${resurce['name']} removido!`)
          this.onRefresh()
        },
        error => {
          console.error(`Erro ao remover categoria. Tente mais tarde!`)
        }
      )
    }
  }
}
