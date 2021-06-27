import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { StoreModule } from '@ngrx/store';
import { AgeGraphModule } from '@app-friends/features/dashboard/age-graph';

export const dashboardsFeatureRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    StoreModule,
    AgeGraphModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardsComponent
      }
    ])
  ],
  declarations: [
    DashboardsComponent
  ],
})
export class DashboardsFeatureModule {}
