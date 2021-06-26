import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { addToAllFriends } from "./friends.actions";

@Injectable()
export class FriendsEffects {
  addToMyFriends$ = createEffect(() => this.actions$.pipe(
    ofType('[Friends] Add To My Friends'),
    map((payload) => addToAllFriends(payload))
  ));

  constructor(private readonly actions$: Actions) {}
}
