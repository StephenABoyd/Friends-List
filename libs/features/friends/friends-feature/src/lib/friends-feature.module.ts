import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { FriendsComponent } from './friends/friends.component';
import { AddFriendModule } from '@app-friends/features/friends/add-friend';
import { FriendsListModule } from '@app-friends/features/friends/friends-list';
import { FriendDetailsModule } from '@app-friends/features/friends/friend-details';
import { StoreModule } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export const friendsFeatureRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FriendsComponent
      }
    ]),
    AddFriendModule,
    FriendsListModule,
    FriendDetailsModule,
    StoreModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    FriendsComponent
  ],
})
export class FriendsFeatureModule {}
