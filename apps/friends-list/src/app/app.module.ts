import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellHeaderModule } from '@app-friends/shell/header'
import { AddFriendModule } from '@app-friends/features/add-friend';
import { FriendsListModule } from '@app-friends/features/friends-list'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ShellHeaderModule,
    AddFriendModule,
    FriendsListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
