import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsListComponent } from './friends-list/friends-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FriendsListComponent
  ],
  exports: [
    FriendsListComponent
  ]
})
export class FriendsListModule {}
