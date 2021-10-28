import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard/dashboard.routing';
import { AuthRoutingModule } from './auth/auth.routing';
import { Home } from 'angular-feather/icons';
import { HomeModule } from './home/home.module';
import { HomeRoutingModule } from './home/home-routing.module';
import { EmbebedRoutingModule } from './embebed/embebed.routing'
import { EmbebedModuleModule } from './embebed/embebed-module.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { EmbebedComponent } from './embebed/embebed.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardModule },
  { path: 'embebed', component: EmbebedComponent },

  // , { path: 'dashboard', redirectTo: '/dashboard', pathMatch: 'full' },
  // , { path: 'embebed', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: '**', component: EmbebedComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    }),
    DashboardRoutingModule,
    AuthRoutingModule,
    HomeRoutingModule,
    EmbebedModuleModule,
    EmbebedRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
