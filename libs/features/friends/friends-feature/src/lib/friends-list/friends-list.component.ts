import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Friend, State } from '@app-friends/utils/friend-store';

@Component({
  selector: 'friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnChanges {
  @Input() selectable?: boolean;
  @Input() friends?: State | null;
  @Output() removeFriend = new EventEmitter<Friend>();
  @Output() selected = new EventEmitter<Friend>();

  myFriends?: Friend[];

  displayedColumns = ['name', 'age', 'weight'];

  ngOnChanges(changes: SimpleChanges) {
    this.myFriends = changes.friends.currentValue.myFriends;
  }

  remove(friend: Friend) {
    this.removeFriend.emit(friend);
  }

  select(friend: Friend) {
    if (this.selectable) {
      this.selected.emit(friend);
    }
  }
}
