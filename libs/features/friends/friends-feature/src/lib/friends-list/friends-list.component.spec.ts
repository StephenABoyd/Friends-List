import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FriendsListComponent } from './friends-list.component';

describe('FriendsListComponent', () => {
  let component: FriendsListComponent;
  let fixture: ComponentFixture<FriendsListComponent>;
  let mockFriend = {
    name: 'Tyler',
    age: 32,
    weight: 200,
    friends: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should set myFriends', () => {
      component.ngOnChanges({
        friends: ({
          currentValue: {
            myFriends: [{ name: 'Tyler' }]
          }
        } as any)
      });

      expect(component.myFriends).toEqual([{ name: 'Tyler' }])
    });
  });

  describe('remove', () => {
    it('should emit friend removal', () => {
      const removeSpy = jest.spyOn(component.removeFriend, 'emit');

      component.remove(mockFriend)

      expect(removeSpy).toHaveBeenCalledTimes(1);
      expect(removeSpy).toHaveBeenCalledWith(mockFriend);
    });
  });

  describe('select', () => {
    it('should emit friend removal', () => {
      const selectspy = jest.spyOn(component.selected, 'emit');
      component.selectable = true;
      component.select(mockFriend)

      expect(selectspy).toHaveBeenCalledTimes(1);
      expect(selectspy).toHaveBeenCalledWith(mockFriend);
    });

    it('should emit friend removal', () => {
      const selectspy = jest.spyOn(component.selected, 'emit');
      component.selectable = false;
      component.select(mockFriend)

      expect(selectspy).not.toHaveBeenCalled();
    });
  });
});
