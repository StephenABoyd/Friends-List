import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { ShellHeaderComponent } from './shell-header/shell-header.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule,
    RouterModule
  ],
  declarations: [
    ShellHeaderComponent
  ],
  exports: [
    ShellHeaderComponent
  ]
})
export class ShellHeaderModule {}
