import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendDetailsComponent } from './friend-details/friend-details.component';
import { AddFriendModule } from '@app-friends/features/add-friend';

@NgModule({
  imports: [
    CommonModule,
    AddFriendModule
  ],
  declarations: [
    FriendDetailsComponent
  ],
  exports: [
    FriendDetailsComponent
  ]
})
export class FriendDetailsModule {}
