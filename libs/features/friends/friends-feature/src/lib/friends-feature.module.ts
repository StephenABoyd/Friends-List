import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Route, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { AddFriendComponent } from './add-friend/add-friend.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { FriendsComponent } from './friends.component';

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
    StoreModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatCardModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  declarations: [
    FriendsComponent,
    AddFriendComponent,
    FriendsListComponent
  ],
})
export class FriendsFeatureModule {}
