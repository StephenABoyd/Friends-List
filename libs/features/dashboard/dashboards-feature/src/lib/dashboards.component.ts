import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Friend, State } from '@app-friends/utils/friend-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-friends-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {
  myFriends: Friend[] = [];
  ageData: Friend[] = [];
  friends?: Observable<State>

  constructor(private readonly store: Store<{ friends: State}>) {}

  ngOnInit() {
    this.friends = this.store.select('friends');
    this.friends.subscribe((friendsState) => {
        this.myFriends = friendsState.myFriends;
    });
  }
}
