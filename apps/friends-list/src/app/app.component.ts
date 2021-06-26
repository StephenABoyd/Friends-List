import { Component, OnInit } from '@angular/core';
import { Friend, State } from '@app-friends/utils/friend-store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-friends-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'friends-list';
  friendDetails: Friend | undefined;
  showAdd = false;

  constructor(private readonly store: Store<{ friends: State}>) {}

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
