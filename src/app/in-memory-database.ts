import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable, of } from 'rxjs';

export class InMemoryDatabase implements InMemoryDbService {
  // createDb(): Observable<any> {
  //   const categories = [
  //     { id: 1, name: 'Moradia', description: 'Pagamentos contas da casa' },
  //     { id: 2, name: 'Saúde', description: 'Plano de saúde e remédios' },
  //     { id: 3, name: 'Lazer', description: 'Cinema, parque, praia, bar, etc' },
  //     { id: 1, name: 'Salário', description: 'Recebimento salário' },
  //     { id: 1, name: 'Extra', description: 'Trabalhos extras' }
  //   ];
  //   return of(categories);
  // }
  createDb() {
    const categories = [
      { id: 1, name: 'Moradia', description: 'Pagamentos contas da casa' },
      { id: 2, name: 'Saúde', description: 'Plano de saúde e remédios' },
      { id: 3, name: 'Lazer', description: 'Cinema, parque, praia, bar, etc' },
      { id: 1, name: 'Salário', description: 'Recebimento salário' },
      { id: 1, name: 'Extra', description: 'Trabalhos extras' }
    ];

    return { categories };
  }
}
