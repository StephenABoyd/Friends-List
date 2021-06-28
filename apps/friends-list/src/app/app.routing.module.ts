import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

const routes: Route[] = [
  {
    path: 'dashboards',
    loadChildren: () => import('@app-friends/features/dashboard/dashboards-feature').then(m => m.DashboardsFeatureModule)
  },
  {
    path: 'friends',
    loadChildren: () => import('@app-friends/features/friends/friends-feature').then(m => m.FriendsFeatureModule)
  },
  {
    path: '',
    redirectTo: '/dashboards',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
