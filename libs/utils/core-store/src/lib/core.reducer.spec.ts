import { coreReducer } from './core.reducer';

describe('core reducer', () => {
  it('should set navItems', () => {
    const newState = coreReducer(
      {
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
      },
      '[Core] Update Nav Items');

    expect(newState).toEqual({
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
    });
  });
});
