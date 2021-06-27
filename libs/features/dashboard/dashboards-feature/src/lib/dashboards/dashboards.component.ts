import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Friend, State } from '@app-friends/utils/friend-store';

@Component({
  selector: 'app-friends-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {
  myFriends: Friend[] = [];
  ageData: Friend[] = [];

  constructor(private readonly store: Store<{ friends: State}>) {}

  ngOnInit() {
    this.store.select('friends').subscribe(friendsState => {
      this.myFriends = friendsState.myFriends;
    });
  }
}
