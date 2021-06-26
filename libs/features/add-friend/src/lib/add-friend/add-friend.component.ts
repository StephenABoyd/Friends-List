import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Store } from '@ngrx/store';
import { State, addToAllFriends, Friend, addToMyFriends } from '@app-friends/utils/friend-store';

@Component({
  selector: 'add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit{
  @ViewChild('friendInput') friendInputField: ElementRef<HTMLInputElement> | undefined;

  addFriendForm: FormGroup;
  selectedFriends: Friend[] = [];
  allFriends: Friend[] = [];
  filteredAllFriends: Observable<Friend[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private readonly fb: FormBuilder, private readonly store: Store<{friends: State}>) {
    this.addFriendForm = this.fb.group({
      name: this.fb.control(''),
      friend: this.fb.control(''),
      age: this.fb.control(0),
      weight: this.fb.control(0)
    });

    this.filteredAllFriends = this.friendInput.valueChanges.pipe(
      map(friendName =>
        {
          const availableFriends = friendName
            ? this.allFriends.filter(friend => friend.name.indexOf(friendName) >= 0)
            : this.allFriends.slice()

          return availableFriends.filter(availableFriend => this.selectedFriends.indexOf(availableFriend) === -1);
        }
    ));
  }

  ngOnInit() {
    this.store.select('friends').subscribe(friends => {
      this.allFriends = friends.allFriends;
    });
  }

  add(event: MatChipInputEvent) {
    if(this.selectedFriends.findIndex(friend => friend.name === event.value) === -1) {
      const friend = this.allFriends.find(friend => friend.name === event.value);
      if (friend) {
        this.selectedFriends.push(friend);
      } else {
        this.selectedFriends.push({
          name: event.value
        });
      }
    }
    event.chipInput?.clear();
    this.friendInput.setValue(null);

    const existingFriend = this.allFriends.findIndex((friend) => friend.name === event.value) >= 0;
    if (!existingFriend) {
      this.store.dispatch(addToAllFriends({
        friend: {
          name: event.value
        }
      }));
    }
  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.selectedFriends.push(event.option.value)
    this.friendInput.setValue(null);
    if (this.friendInputField) {
      this.friendInputField.nativeElement.value = '';
    }
    this.friendInput.updateValueAndValidity();
  }

  remove(friend: string) {
    const index = this.selectedFriends.findIndex(selectedFriend => selectedFriend.name === friend);

    if (index >= 0) {
      this.selectedFriends.splice(index, 1);
    }
  }

  onSubmit() {
    const friendToAdd = this.addFriendForm.value;
    delete friendToAdd.friend;
    friendToAdd.friends = this.selectedFriends;

    if (this.allFriends.findIndex(friend => friend.name === friendToAdd.name) === -1) {
      this.store.dispatch(addToMyFriends({
        friend: friendToAdd
      }));
    } else {
      // TODO: show message saying friend already added
    }
  }

  get friendInput(): FormControl {
    return this.addFriendForm.get('friend') as FormControl;
  }
}
