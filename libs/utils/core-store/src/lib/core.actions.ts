import { createAction, props } from '@ngrx/store';

import { NavItem } from './core.reducer';

export const updateNavItems = createAction('[Core] Update Nav Items', props<{ navItems: NavItem[] }>());
