import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocsUserComponent } from './docs-user/docs-user.component';
import { NewUserComponent } from './new-user/new-user.component';

const routes: Routes = [
  { path: 'home/user', component: NewUserComponent },
  { path: 'home/docsfull', component: DocsUserComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
