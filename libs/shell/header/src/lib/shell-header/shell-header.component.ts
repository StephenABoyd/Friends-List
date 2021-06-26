import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavItem, State } from '@app-friends/utils/core-store';

@Component({
  selector: 'shell-header',
  templateUrl: './shell-header.component.html',
  styleUrls: ['./shell-header.component.scss']
})
export class ShellHeaderComponent implements OnInit {
  navItems: NavItem[] = [];

  constructor(private readonly store: Store<{ core: State}>) {}

  ngOnInit() {
    this.store.select('core').subscribe(coreState => {
      this.navItems = coreState.navItems;
    });
  }
}
