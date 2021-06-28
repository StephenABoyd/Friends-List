import { J } from '@angular/cdk/keycodes';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import exp = require('node:constants');
import { FriendsComponent } from './friends.component';

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsComponent ],
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
      component.updateFriend(mockFriend);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: '[Friends] Update Friend',
        friend: mockFriend
      })
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
