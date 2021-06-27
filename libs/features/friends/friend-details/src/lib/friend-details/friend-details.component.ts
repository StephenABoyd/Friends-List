import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Friend } from '@app-friends/utils/friend-store';

@Component({
  selector: 'friend-details',
  templateUrl: './friend-details.component.html',
  styleUrls: ['./friend-details.component.scss']
})
export class FriendDetailsComponent {
  @Input() friend?: Friend;
  @Output() closeForm = new EventEmitter<void>();

  close() {
    this.closeForm.emit();
  }
}