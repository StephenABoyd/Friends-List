import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AddFriendComponent } from './add-friend.component';

describe('AddFriendComponent', () => {
  let component: AddFriendComponent;
  let fixture: ComponentFixture<AddFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFriendComponent ],
      imports: [ ReactiveFormsModule, MatAutocompleteModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter friends', (done) => {
    component.allFriends = [
      { name: 'Tyler', age: 25, weight: 200 },
      { name: 'Sarah', age: 20, weight: 120 },
      { name: 'Mike', age: 30, weight: 200 },
      { name: 'Kim', age: 35, weight: 110 }
    ];

    component.filteredAllFriends.subscribe((friends) => {
      expect(friends.length).toEqual(1);
      expect(friends[0]).toEqual({ name: 'Sarah', age: 20, weight: 120 });
      done();
    });

    component.friendInput.setValue('S');
  });

  describe('ngOnChanges', () => {
    it('should set allFriends and myFriends', () => {
      component.ngOnChanges(({
        friends: {
          currentValue: {
            allFriends: [
              { name: 'Tyler', age: 25, weight: 200 },
              { name: 'Sarah', age: 20, weight: 120 }
            ],
            myFriends: [
              { name: 'Sarah', age: 20, weight: 120 }
            ]
          }
        }
      } as any));

      expect(component.myFriends).toEqual([
        { name: 'Sarah', age: 20, weight: 120 }
      ]);
      expect(component.allFriends).toEqual([
        { name: 'Tyler', age: 25, weight: 200 },
        { name: 'Sarah', age: 20, weight: 120 }
      ]);
    });

    it('should populate form with friend details', () => {
      component.ngOnChanges({
        friend: {
          currentValue: {
            name: 'Andy',
            age: 26,
            weight: 165,
            friends: [{ name: 'Tyler' }]
          }
        }
      } as any);

      expect(component.selectedFriends).toEqual([
        { name: 'Tyler' }
      ]);
      expect(component.addFriendForm.get('age')?.value).toEqual(26);
      expect(component.addFriendForm.get('name')?.value).toEqual('Andy');
      expect(component.addFriendForm.get('weight')?.value).toEqual(165);
    });
  });

  describe('add', () => {
    it('should call addFriend and clear the input', () => {
      const addFriendSpy = jest.spyOn(component, 'addFriend');
      const event = {
        value: 'Hello',
        chipInput: {
          clear: jest.fn()
        }
      };

      component.add(event as any);

      expect(event.chipInput.clear).toHaveBeenCalled();
      expect(addFriendSpy).toHaveBeenCalledWith('Hello');
    });
  });

  describe('addFriend', () => {
    it('should add friend to selected friends and emit addition of friend', () => {
      const emitSpy = jest.spyOn(component.addToAllFriends, 'emit');
      component.selectedFriends = [];
      component.addFriend('Hello Friend   ');
      expect(component.selectedFriends).toEqual([
        { name: 'Hello Friend' }
      ]);
      expect(emitSpy).toHaveBeenCalled();
      expect(emitSpy).toHaveBeenCalledWith({
        name: 'Hello Friend'
      });
    });

    it('should add selected friend details if existing and not emit addition', () => {
      const emitSpy = jest.spyOn(component.addToAllFriends, 'emit');
      component.selectedFriends = [];
      component.allFriends = [
        { name: 'Hello Friend', age: 32, weight: 200 }
      ];
      component.addFriend('Hello Friend   ');
      expect(component.selectedFriends).toEqual([
        { name: 'Hello Friend', age: 32, weight: 200 }
      ]);
      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should not add to selected if name already selected', () => {
      component.selectedFriends = [
        { name: 'Andy' }
      ];

      component.addFriend('Andy');

      expect(component.selectedFriends).toEqual([
        { name: 'Andy' }
      ]);
    });
  });

  describe('selected', () => {
    it('should push selected autocomplete option to selected friends', () => {
      const event = {
        option: {
          value: { name: 'Sarah', age: 26, weight: 120 }
        }
      };
      const updateSpy = jest.spyOn(component.friendInput, 'updateValueAndValidity');

      component.selected(event as any);

      expect(component.selectedFriends).toEqual([
        { name: 'Sarah', age: 26, weight: 120 }
      ]);
      expect(component.friendInput.value).toEqual(null);
      expect(component.friendInputField?.nativeElement.value).toEqual('');
      expect(updateSpy).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove from selected friends', () => {
      component.selectedFriends = [
        { name: 'Tyler', age: 29, weight: 200 }
      ];

      component.remove('Tyler');
      expect(component.selectedFriends.length).toEqual(0);
    });
  });

  describe('close', () => {
    it('should emit a close event', () => {
      const emitSpy = jest.spyOn(component.closeForm, 'emit');
      component.close();
      expect(emitSpy).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('should emit friend to add', () => {
      component.update = false;
      component.addFriendForm.get('name')?.setValue('Sarah');
      component.addFriendForm.get('age')?.setValue(24);
      component.addFriendForm.get('weight')?.setValue(110);
      component.addFriendForm.get('friend')?.setValue('');
      component.selectedFriends = [
        { name: 'Andy' }
      ];
      const emitSpy = jest.spyOn(component.addToMyFriends, 'emit');

      component.onSubmit();

      expect(emitSpy).toHaveBeenCalledWith({
        name: 'Sarah',
        age: 24,
        weight: 110,
        friends: [
          { name: 'Andy' }
        ]
      });
    });

    it('should emit friend to update', () => {
      component.update = true;
      component.addFriendForm.get('name')?.setValue('Sarah');
      component.addFriendForm.get('age')?.setValue(24);
      component.addFriendForm.get('weight')?.setValue(110);
      component.addFriendForm.get('friend')?.setValue('');
      component.selectedFriends = [
        { name: 'Andy' }
      ];
      const emitSpy = jest.spyOn(component.updateFriend, 'emit');

      component.onSubmit();

      expect(emitSpy).toHaveBeenCalledWith({
        name: 'Sarah',
        age: 24,
        weight: 110,
        friends: [
          { name: 'Andy' }
        ]
      });
    });

    it('should emit friend to add should not emit to myFriends', () => {
      component.update = false;
      component.myFriends = [
        { name: 'Sarah' }
      ];
      component.addFriendForm.get('name')?.setValue('Sarah');
      component.addFriendForm.get('age')?.setValue(24);
      component.addFriendForm.get('weight')?.setValue(110);
      component.addFriendForm.get('friend')?.setValue('');
      component.selectedFriends = [
        { name: 'Andy' }
      ];
      const emitSpy = jest.spyOn(component.addToMyFriends, 'emit');

      component.onSubmit();

      expect(emitSpy).not.toHaveBeenCalled();
    });
  });
});
