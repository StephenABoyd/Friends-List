import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { StoreModule } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    StoreModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    FriendsListComponent
  ],
  exports: [
    FriendsListComponent
  ]
})
export class FriendsListModule {}