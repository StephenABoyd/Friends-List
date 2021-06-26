import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { DashboardsComponent } from './dashboards/dashboards.component';

export const dashboardsFeatureRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
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
