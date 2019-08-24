import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// import { PCalendarPtbrModule } from 'p-calendar-ptbr';

// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { InMemoryDatabase } from './in-memory-database';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    // PCalendarPtbrModule,
    BrowserAnimationsModule

    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase)
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-br' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
