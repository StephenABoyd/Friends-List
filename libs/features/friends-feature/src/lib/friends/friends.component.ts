import { Component, OnInit } from '@angular/core';
import { Friend, State as FriendsState } from '@app-friends/utils/friend-store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-friends-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  friendDetails: Friend | undefined;
  showAdd = false;

  constructor(private readonly store: Store<{ friends: FriendsState }>) {}

  ngOnInit() {
    this.store.select('friends').subscribe(friendsState => {
      this.friendDetails = friendsState.selectedFriend;
    });
  }

  openFriendDetails(friend: Friend) {
    this.friendDetails = friend;
  }

  openAddNew() {
    this.showAdd = true;
  }
}
