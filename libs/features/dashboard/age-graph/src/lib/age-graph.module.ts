import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgeGraphComponent } from './age-graph/age-graph.component';
import { MatCardModule } from '@angular/material/card';

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
