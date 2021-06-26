import { createReducer, on } from "@ngrx/store"
import { addToAllFriends, addToMyFriends, removeFromMyFriends } from "./friends.actions";

export interface Friend {
  name: string;
  friends: Friend[];
  age: number;
  weight: number;
}

interface State {
  allFriends: Friend[],
  myFriends: Friend[]
}

export const initialState: State = {
  allFriends: [],
  myFriends: []
}

const _friendReducer = createReducer(
  initialState,
  on(addToAllFriends, (state, action) => ({
    ...state,
    allFriends: [
      ...state.allFriends,
      action.friend
    ]
  })),
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
  }))
);

export function friendReducer(state, action) {
  return _friendReducer(state, action);
}
