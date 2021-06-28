import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { AgeRangeGraphComponent } from './age-range-graph.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule
  ],
  declarations: [
    AgeRangeGraphComponent
  ],
  exports: [
    AgeRangeGraphComponent
  ]
})
export class AgeRangeGraphModule {}
