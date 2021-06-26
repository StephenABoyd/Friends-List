import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellHeaderComponent } from './shell-header/shell-header.component';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

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
