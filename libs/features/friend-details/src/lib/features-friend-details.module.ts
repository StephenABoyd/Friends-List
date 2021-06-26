import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendDetailsComponent } from './friend-details/friend-details.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FriendDetailsComponent
  ],
  exports: [
    FriendDetailsComponent
  ]
})
export class FriendDetailsModule {}
