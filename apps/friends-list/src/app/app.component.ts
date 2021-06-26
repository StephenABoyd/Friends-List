import { Component } from '@angular/core';
import { Friend } from '@app-friends/utils/friend-store';

@Component({
  selector: 'app-friends-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'friends-list';
  friendDetails: Friend | undefined;

  openFriendDetails(friend: Friend) {
    this.friendDetails = friend;
  }
}
