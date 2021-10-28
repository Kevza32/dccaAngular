import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NewUserComponent } from './new-user/new-user.component';
import { DocsUserComponent } from './docs-user/docs-user.component';


@NgModule({
  declarations: [NewUserComponent, DocsUserComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
