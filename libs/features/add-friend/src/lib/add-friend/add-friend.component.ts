import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit{
  @ViewChild('friendInput') friendInputField: ElementRef<HTMLInputElement> | undefined;

  addFriendForm: FormGroup;
  selectedFriends: string[] = [];
  allFriends: string[] = ['Andy', 'Sarah', 'Molly']; // tie allFriends to ngrx state for list of all people
  filteredAllFriends: Observable<string[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private readonly fb: FormBuilder) {
    this.addFriendForm = this.fb.group({
      name: this.fb.control(''),
      friend: this.fb.control(''),
      age: this.fb.control(0),
      weight: this.fb.control(0)
    });

    this.filteredAllFriends = this.friendInput.valueChanges.pipe(
      map(friendName =>
        {
          console.log(this.allFriends);
          const availableFriends = friendName
            ? this.allFriends.filter(friend => friend.indexOf(friendName) >= 0)
            : this.allFriends.slice()

          return availableFriends.filter(availableFriend => this.selectedFriends.indexOf(availableFriend) === -1);
        }
      ));
  }

  ngOnInit() {
    console.log('');
    // this.filteredAllFriends = this.friendInput.valueChanges.pipe(
    //   map(friendName =>
    //     friendName
    //       ? this.allFriends.filter(friend => friend.indexOf(friendName) >= 0)
    //       : this.allFriends.slice()
    //   ));
  }

  add(event: MatChipInputEvent) {
    if (this.selectedFriends.indexOf(event.value) === -1) {
      this.selectedFriends.push(event.value);
    }
    event.chipInput?.clear();
    this.friendInput.setValue(null);

    const existingFriend = this.allFriends.findIndex((friend) => friend === event.value) >= 0;
    if (!existingFriend) {
      this.allFriends.push(event.value);
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
    const index = this.selectedFriends.indexOf(friend);

    if (index >= 0) {
      this.selectedFriends.splice(index, 1);
    }
  }

  onSubmit() {
    // Emit addition event to ngrx store
  }

  get friendInput(): FormControl {
    return this.addFriendForm.get('friend') as FormControl;
  }
}
