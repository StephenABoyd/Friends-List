import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { AgeGraphComponent } from './age-graph.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule
  ],
  declarations: [
    AgeGraphComponent
  ],
  exports: [
    AgeGraphComponent
  ]
})
export class AgeGraphModule {}
