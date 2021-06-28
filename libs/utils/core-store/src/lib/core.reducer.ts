import { createReducer, on } from '@ngrx/store';

import { updateNavItems } from './core.actions';

export interface NavItem {
  label: string;
  link: string;
};

export interface State {
  navItems: NavItem[];
};

export const initialState: State = {
  navItems: [
    {
      label: 'Dashboard',
      link: '/dashboards'
    },
    {
      label: 'Friends',
      link: '/friends'
    }
  ]
};

const _coreReducer = createReducer(
  initialState,
  on(updateNavItems, (state, action) => {
    return {
      ...state,
      navItems: action.navItems
    };
  })
);

export function coreReducer(state: any, action: any) {
  return _coreReducer(state, action);
}
