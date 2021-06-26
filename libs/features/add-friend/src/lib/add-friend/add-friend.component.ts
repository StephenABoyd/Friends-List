import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Store } from '@ngrx/store';
import { State, addToAllFriends, Friend, addToMyFriends, updateFriend } from '@app-friends/utils/friend-store';

@Component({
  selector: 'add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit, OnChanges {
  @ViewChild('friendInput') friendInputField: ElementRef<HTMLInputElement> | undefined;
  @Input() friend?: Friend;
  @Input() update?: boolean;
  @Output() closeForm = new EventEmitter<void>();

  addFriendForm: FormGroup;
  selectedFriends: Friend[] = [];
  allFriends: Friend[] = [];
  myFriends: Friend[] = [];
  filteredAllFriends: Observable<Friend[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private readonly fb: FormBuilder, private readonly store: Store<{friends: State}>) {
    this.addFriendForm = this.fb.group({
      name: this.fb.control(null, Validators.required),
      friend: this.fb.control(null),
      age: this.fb.control(null, Validators.required),
      weight: this.fb.control(null, Validators.required)
    });

    this.filteredAllFriends = this.friendInput.valueChanges.pipe(
      map(friendName =>
        {
          const availableFriends = friendName
            ? this.allFriends.filter(friend => friend.name.indexOf(friendName) >= 0)
            : this.allFriends.slice()

          return availableFriends.filter(availableFriend => this.selectedFriends.findIndex(friend => friend.name === availableFriend.name) === -1);
        }
    ));
  }

  ngOnInit() {
    this.store.select('friends').subscribe(friendsState => {
      this.allFriends = friendsState.allFriends;
      this.myFriends = friendsState.myFriends;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const friend = changes.friend.currentValue;
    if (friend) {
      this.selectedFriends = [];
      this.addFriendForm.get('age')?.setValue(friend.age);
      this.addFriendForm.get('name')?.setValue(friend.name);
      this.addFriendForm.get('weight')?.setValue(friend.weight);
      if (friend.friends) {
        this.selectedFriends = [...friend.friends];
      }
    }
  }

  add(event: MatChipInputEvent) {
    this.addFriend(event.value);
    event.chipInput?.clear();
  }

  addFriend(name: string) {
    this.selectedFriends = [...this.selectedFriends];
    if (name?.trim() !== '') {
      name = name.trim();
      if(this.selectedFriends.findIndex(friend => friend.name === name) === -1) {
        const friend = this.allFriends.find(friend => friend.name === name);
        if (friend) {
          this.selectedFriends.push(friend);
        } else {
          this.selectedFriends.push({
            name
          });
        }
      }

      this.friendInput.setValue(null);

      const existingFriend = this.allFriends.findIndex((friend) => friend.name === name) >= 0;
      if (!existingFriend) {
        this.store.dispatch(addToAllFriends({
          friend: {
            name
          }
        }));
      }
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

  closeUpdate() {
    this.closeForm?.emit();
  }

  onSubmit() {
    for(const control in this.addFriendForm.controls) {
      this.addFriendForm.controls[control].updateValueAndValidity();
    }
    if (this.addFriendForm.valid) {
      const friendToAdd = {
        ...this.addFriendForm.value,
        friends: this.selectedFriends
      };
      delete friendToAdd.friend;

      if (!this.update) {
        if (this.myFriends.findIndex(friend => friend.name === friendToAdd.name) === -1) {
          this.store.dispatch(addToMyFriends({
            friend: friendToAdd
          }));
        } else {
          // TODO: show message saying friend already added
        }
        for(const control in this.addFriendForm.controls) {
          this.addFriendForm.controls[control].setValue(null);
          this.addFriendForm.controls[control].setErrors(null);
        }
        this.selectedFriends = [];
      } else {
        this.store.dispatch(updateFriend({friend: friendToAdd}));
      }
    }
  }

  get friendInput(): FormControl {
    return this.addFriendForm.get('friend') as FormControl;
  }

  onBlur(event: FocusEvent) {
    const input = (event.target as HTMLInputElement);
    const name = input?.value;
    this.addFriend(name);
    input.value = '';
  }
}
