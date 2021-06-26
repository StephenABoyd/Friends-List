import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    StoreModule
  ],
  declarations: [
    FriendsListComponent
  ],
  exports: [
    FriendsListComponent
  ]
})
export class FriendsListModule {}
