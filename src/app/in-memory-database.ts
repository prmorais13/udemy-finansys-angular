import { InMemoryDbService } from 'angular-in-memory-web-api'
import { CategoryModel } from './pages/categories/model/category.model'
import { EntryModel } from './pages/entries/model/entry.model'

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
    const categories: CategoryModel[] = [
      { id: 1, name: 'Moradia', description: 'Pagamentos contas da casa' },
      { id: 2, name: 'Saúde', description: 'Plano de saúde e remédios' },
      { id: 3, name: 'Lazer', description: 'Cinema, parque, praia, bar, etc' },
      { id: 4, name: 'Salário', description: 'Recebimento salário' },
      { id: 5, name: 'Extra', description: 'Trabalhos extras' }
    ]

    const entries: EntryModel[] = [
      {
        id: 1,
        name: 'Gás de cozinha',
        categoryId: categories[0].id,
        category: categories[0],
        paid: true,
        date: '14/10/2018',
        amount: '70,80',
        type: 'expense',
        description: 'Botijão de 13 Kg'
      } as EntryModel,
      {
        id: 2,
        name: 'Suplemento',
        categoryId: categories[1].id,
        category: categories[1],
        paid: false,
        date: '14/10/2018',
        amount: '15,80',
        type: 'expense',
        description: 'Suplemento vitamínico'
      } as EntryModel,
      {
        id: 3,
        name: 'Salário PMN',
        categoryId: categories[3].id,
        category: categories[3],
        paid: true,
        date: '15/10/2018',
        amount: '4.773,00',
        type: 'revenue',
        description: 'Salário outubro/2018'
      } as EntryModel,
      {
        id: 4,
        name: 'Prestação casa',
        categoryId: categories[0].id,
        category: categories[0],
        paid: true,
        date: '16/10/2018',
        amount: '590,00',
        type: 'expense',
        description: 'Prestação outubro/2018'
      } as EntryModel,
      {
        id: 5,
        name: 'Cinema',
        categoryId: categories[2].id,
        category: categories[2],
        paid: true,
        date: '20/10/2018',
        amount: '50,00',
        type: 'expense',
        description: 'Filme os vingadores'
      } as EntryModel
    ]

    return { categories, entries }
  }
}
