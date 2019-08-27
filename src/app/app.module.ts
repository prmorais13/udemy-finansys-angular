import { NgModule } from '@angular/core'
// import { PCalendarPtbrModule } from 'p-calendar-ptbr';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDatabase } from './in-memory-database';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { CoreModule } from './core/core.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    AppRoutingModule
    // PCalendarPtbrModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
