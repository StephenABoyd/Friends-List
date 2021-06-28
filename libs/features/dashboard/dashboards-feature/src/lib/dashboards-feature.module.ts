import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AgeGraphModule } from '@app-friends/features/dashboard/age-graph';
import { AgeRangeGraphModule } from '@app-friends/features/dashboard/age-range-graph';
import { StoreModule } from '@ngrx/store';

import { DashboardsComponent } from './dashboards.component';

export const dashboardsFeatureRoutes: Route[] = [
  {
    path: '',
    component: DashboardsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule,
    AgeGraphModule,
    AgeRangeGraphModule,
    RouterModule.forChild(dashboardsFeatureRoutes)
  ],
  declarations: [
    DashboardsComponent
  ],
})
export class DashboardsFeatureModule {}
