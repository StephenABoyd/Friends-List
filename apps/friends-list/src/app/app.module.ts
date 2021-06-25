import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellHeaderModule } from '@app-friends/shell/header'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ShellHeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
