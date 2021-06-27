import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, Friend, removeFromMyFriends, selectFriend } from '@app-friends/utils/friend-store';

@Component({
  selector: 'friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  @Input() selectable?: boolean;
  myFriends: Friend[] = [];
  displayedColumns = ['name', 'age', 'weight']

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
      this.store.dispatch(selectFriend({
        friend
      }));
    }
  }
}
