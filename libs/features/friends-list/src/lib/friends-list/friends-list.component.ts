import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, Friend } from '@app-friends/utils/friend-store';

@Component({
  selector: 'friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  myFriends: Friend[] = [];

  constructor(private readonly store: Store<{ friends: State }>) {}

  ngOnInit() {
    this.store.select('friends').subscribe(friendsState => {
      this.myFriends = friendsState.myFriends;
    });
  }
}
