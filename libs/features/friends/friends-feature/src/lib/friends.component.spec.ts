import { J } from '@angular/cdk/keycodes';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FriendsComponent } from './friends.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FriendsComponent', () => {
  let component: FriendsComponent;
  let fixture: ComponentFixture<FriendsComponent>;
  let store: MockStore;
  let mockFriend = {
    name: 'Tyler',
    age: 25,
    weight: 200,
    friends: []
  };
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsComponent ],
      imports: [ MatSnackBarModule, BrowserAnimationsModule ],
      providers:[
        provideMockStore({initialState: {
          allFriends: [],
          myFriends: []
        }})
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsComponent);
    snackBar = TestBed.get(MatSnackBar);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('removeFriend', () => {
    it('should dispatch removal', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      component.removeFriend(mockFriend);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: '[Friends] Remove From My Friends',
        friend: mockFriend
      })
    });
  });

  describe('addToAllFriends', () => {
    it('should dispatch to add to all friends', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      component.addToAllFriends(mockFriend);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: '[Friends] Add To All Friends',
        friend: mockFriend
      })
    });
  });

  describe('addToMyFriends', () => {
    it('should dispatch to add to all friends', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      component.addToMyFriends(mockFriend);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: '[Friends] Add To My Friends',
        friend: mockFriend
      })
    });
  });

  describe('updateFriend', () => {
    it('should dispatch to add to all friends', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      const openSpy = jest.spyOn(snackBar, 'open');
      component.updateFriend(mockFriend);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: '[Friends] Update Friend',
        friend: mockFriend
      });
      expect(openSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('openAddNew', () => {
    it('should show the add new component', () => {
      component.showAdd = false;
      component.openAddNew();
      expect(component.showAdd).toBeTruthy();
    });
  });
});
