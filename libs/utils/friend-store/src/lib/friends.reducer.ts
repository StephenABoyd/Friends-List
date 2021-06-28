import { createReducer, on } from '@ngrx/store';

import { addToAllFriends, addToMyFriends, removeFromMyFriends, updateFriend } from './friends.actions';

export interface Friend {
  name: string;
  friends?: Friend[];
  age?: number;
  weight?: number;
}

export interface State {
  allFriends: Friend[];
  myFriends: Friend[];
}

export const initialState: State = {
  allFriends: [],
  myFriends: []
};

const _friendReducer = createReducer(
  initialState,
  on(addToAllFriends, (state, action) => {
    const allFriends = [...state.allFriends];
    if (allFriends.findIndex(friend => friend.name === action.friend.name) === -1) {
      allFriends.push(action.friend);
    }
    return {
      ...state,
      allFriends
    };
  }),
  on(addToMyFriends, (state, action) => ({
    ...state,
    myFriends: [
      ...state.myFriends,
      action.friend
    ]
  })),
  on(removeFromMyFriends, (state, action) => ({
    ...state,
    myFriends: state.myFriends.filter(friend => friend.name !== action.friend.name)
  })),
  on(updateFriend, (state, action) => ({
    ...state,
    allFriends: state.allFriends.map(friend => {
      if (friend.name === action.friend.name) {
        friend = action.friend;
      }
      return friend;
    }),
    myFriends: state.myFriends.map(friend => {
      if (friend.name === action.friend.name) {
        friend = action.friend;
      }
      return friend;
    })
  }))
);

export function friendReducer(state: any, action: any) {
  return _friendReducer(state, action);
}
