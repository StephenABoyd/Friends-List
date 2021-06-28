import { createAction, props } from '@ngrx/store';
import { Friend } from './friends.reducer';

export const addToAllFriends = createAction('[Friends] Add To All Friends', props<{ friend: Friend }>());
export const updateFriend = createAction('[Friends] Update Friend', props<{ friend: Friend }>());
export const addToMyFriends = createAction('[Friends] Add To My Friends', props<{ friend: Friend }>());
export const removeFromMyFriends = createAction('[Friends] Remove From My Friends', props<{ friend: Friend }>());
