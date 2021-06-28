import { friendReducer } from './friends.reducer';

describe('friend reducer', () => {
  it('addToAllFriends', () => {
    const result = friendReducer({
      allFriends: [],
      myFriends: []
    }, '[Friends] Add To All Friends');

    
  });
});
