import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FriendsComponent } from './friends.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { ReactiveFormsModule } from '@angular/forms';

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
