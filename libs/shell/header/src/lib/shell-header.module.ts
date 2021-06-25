import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellHeaderComponent } from './shell-header/shell-header.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ShellHeaderComponent
  ],
  exports: [
    ShellHeaderComponent
  ]
})
export class ShellHeaderModule {}
