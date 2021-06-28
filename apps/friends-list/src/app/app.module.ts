import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellHeaderModule } from '@app-friends/shell/header';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { friendReducer, FriendsEffects } from '@app-friends/utils/friend-store';
import { coreReducer } from '@app-friends/utils/core-store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ShellHeaderModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forRoot([
      {
        path: 'dashboards',
        loadChildren: () => import('@app-friends/features/dashboard/dashboards-feature').then(m => m.DashboardsFeatureModule)
      },
      {
        path: 'friends',
        loadChildren: () => import('@app-friends/features/friends/friends-feature').then(m => m.FriendsFeatureModule)
      },
      {
        path: '',
        redirectTo: '/dashboards',
        pathMatch: 'full'
      }
    ]),
    StoreModule.forRoot(
      {
        friends: friendReducer,
        core: coreReducer
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
