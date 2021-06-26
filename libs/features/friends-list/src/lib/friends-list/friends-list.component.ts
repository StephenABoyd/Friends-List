import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, Friend, removeFromMyFriends } from '@app-friends/utils/friend-store';

@Component({
  selector: 'friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  @Input() selectable?: boolean;
  @Output() selectFriend = new EventEmitter<Friend>();
  myFriends: Friend[] = [];

  constructor(private readonly store: Store<{ friends: State }>) {}

  ngOnInit() {
    this.store.select('friends').subscribe(friendsState => {
      this.myFriends = friendsState.myFriends;
    });
  }

  remove(friend: Friend) {
    this.store.dispatch(removeFromMyFriends({
      friend
    }));
  }

  select(friend: Friend) {
    if (this.selectable) {
      this.selectFriend.emit(friend);
    }
  }
}
