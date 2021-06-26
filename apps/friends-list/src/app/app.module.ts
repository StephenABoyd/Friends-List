import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellHeaderModule } from '@app-friends/shell/header';
import { AddFriendModule } from '@app-friends/features/add-friend';
import { FriendsListModule } from '@app-friends/features/friends-list';
import { FriendDetailsModule } from '@app-friends/features/friend-details';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { friendReducer, FriendsEffects } from '@app-friends/utils/friend-store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ShellHeaderModule,
    AddFriendModule,
    FriendsListModule,
    FriendDetailsModule,
    StoreModule.forRoot(
      {
        friends: friendReducer
      },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([
      FriendsEffects
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
