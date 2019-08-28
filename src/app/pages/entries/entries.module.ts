import { NgModule } from '@angular/core';

import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';

import { SharedModule } from '../../shared/shared.module';
import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';

@NgModule({
  declarations: [EntryListComponent, EntryFormComponent],
  imports: [SharedModule, CalendarModule, IMaskModule, EntriesRoutingModule]
})
export class EntriesModule {}
