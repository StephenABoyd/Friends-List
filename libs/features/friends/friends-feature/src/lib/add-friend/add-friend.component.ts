import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Friend, State } from '@app-friends/utils/friend-store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnChanges {
  @ViewChild('friendInput') friendInputField: ElementRef<HTMLInputElement> | undefined;
  @Input() friend?: Friend;
  @Input() update?: boolean;
  @Input() friends?: State | null;
  @Output() closeForm = new EventEmitter<void>();
  @Output() addToAllFriends = new EventEmitter<Friend>();
  @Output() addToMyFriends = new EventEmitter<Friend>();
  @Output() updateFriend = new EventEmitter<Friend>();

  allFriends: Friend[] = [];
  myFriends: Friend[] = [];
  addFriendForm: FormGroup;
  selectedFriends: Friend[] = [];
  filteredAllFriends: Observable<Friend[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private readonly fb: FormBuilder) {
    this.addFriendForm = this.fb.group({
      name: this.fb.control(null, Validators.required),
      friend: this.fb.control(null),
      age: this.fb.control(null, Validators.required),
      weight: this.fb.control(null, Validators.required)
    });

    this.filteredAllFriends = this.friendInput.valueChanges.pipe(
      map((name) => this.filterFriends(name)));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.friends?.currentValue) {
      this.allFriends = changes.friends.currentValue.allFriends;
      this.myFriends = changes.friends.currentValue.myFriends;
    }

    if (changes.friend?.currentValue) {
      const friend = changes.friend.currentValue;
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
      this.addToSelectedFriends(name);
      this.friendInput.setValue(null);
      this.addFriendToAllFriends(name);
    }
  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.selectedFriends.push(event.option.value);
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

  close() {
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
          this.addToMyFriends.emit(friendToAdd);
        }
        for(const control in this.addFriendForm.controls) {
          this.addFriendForm.controls[control].setValue(null);
          this.addFriendForm.controls[control].setErrors(null);
        }
        this.selectedFriends = [];
      } else {
        this.updateFriend.emit(friendToAdd);
      }
    }
  }

  get friendInput(): FormControl {
    return this.addFriendForm.get('friend') as FormControl;
  }

  private addFriendToAllFriends(name: string) {
    const existingFriend = this.allFriends.findIndex((friend) => friend.name === name) >= 0;
    if (!existingFriend) {
      this.addToAllFriends.emit({
        name
      });
    }
  }

  private addToSelectedFriends(name: string) {
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
  }

  private filterFriends(friendName: string) {
    const availableFriends = friendName
          ? this.allFriends.filter(friend => friend.name.indexOf(friendName) >= 0)
          : this.allFriends.slice();

    return availableFriends.filter(availableFriend => this.selectedFriends.findIndex(friend => friend.name === availableFriend.name) === -1);
  }
}
