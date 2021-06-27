import { createReducer, on } from "@ngrx/store"
import { addToAllFriends, addToMyFriends, removeFromMyFriends, selectFriend, updateFriend } from "./friends.actions";

const mockFriends: Friend[] = [
  {
    name: 'Tyler',
    age: 29,
    weight: 200,
    friends: [
      { name: 'Andy' },
      { name: 'Sarah' },
      { name: 'Mike' }
    ]
  },
  {
    name: 'Sarah',
    age: 24,
    weight: 115,
    friends: [
      { name: 'Andy' },
      { name: 'Tyler' },
      { name: 'Mike' }
    ]
  },
  {
    name: 'Andy',
    age: 26,
    weight: 165,
    friends: [
      { name: 'Tyler' },
      { name: 'Sarah' },
      { name: 'Mike' }
    ]
  },
  {
    name: 'Molly',
    age: 26,
    weight: 120,
    friends: [
      { name: 'Kim' }
    ]
  },
  {
    name: 'Kim',
    age: 56,
    weight: 125,
    friends: [
      { name: 'Molly' }
    ]
  },
  {
    name: 'Mike',
    age: 67,
    weight: 210,
    friends: [
      { name: 'Andy' },
      { name: 'Sarah' },
      { name: 'Tyler' }
    ]
  }
]

export interface Friend {
  name: string;
  friends?: Friend[];
  age?: number;
  weight?: number;
}

export interface State {
  allFriends: Friend[];
  myFriends: Friend[];
  selectedFriend: Friend | undefined;
}

export const initialState: State = {
  allFriends: mockFriends,
  myFriends: mockFriends,
  selectedFriend: undefined
}

const _friendReducer = createReducer(
  initialState,
  on(addToAllFriends, (state, action) => {
    const allFriends = [...state.allFriends];
    if (allFriends.findIndex(friend => friend.name === action.friend.name) === -1) {
      allFriends.push(action.friend)
    }
    return {
      ...state,
      allFriends
    }
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
  })),
  on(selectFriend, (state, action) => ({
    ...state,
    selectedFriend: action.friend
  }))
);

export function friendReducer(state: any, action: any) {
  return _friendReducer(state, action);
}
