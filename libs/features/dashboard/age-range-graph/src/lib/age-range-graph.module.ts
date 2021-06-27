import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgeRangeGraphComponent } from './age-range-graph.component';
import { MatCardModule } from '@angular/material/card';

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
