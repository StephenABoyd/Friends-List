import { Component, OnInit } from '@angular/core';
import { addToAllFriends, addToMyFriends, Friend, removeFromMyFriends, State, updateFriend } from '@app-friends/utils/friend-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-friends-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {
  friendDetails: Friend | undefined;
  showAdd = false;
  myFriends?: Friend[];
  allFriends?: Friend[];
  friendsState: Observable<State>;

  constructor(private readonly store: Store<{ friends: State }>) {
    this.friendsState = store.select('friends');
  }

  openAddNew() {
    this.showAdd = true;
  }

  removeFriend(friend: Friend) {
    this.store.dispatch(removeFromMyFriends({
      friend
    }));
  }

  addToAllFriends(friend: Friend) {
    this.store.dispatch(addToAllFriends({ friend }));
  }

  addToMyFriends(friend: Friend) {
    this.store.dispatch(addToMyFriends({ friend }))
  }

  updateFriend(friend: Friend) {
    this.store.dispatch(updateFriend({ friend }))
  }
}
