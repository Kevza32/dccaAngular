import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { EmbebedComponent } from './embebed/embebed.component';
import { EmbebedModuleModule } from './embebed/embebed-module.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmbebedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    EmbebedModuleModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ComponentsModule,
    AuthModule,
    HomeModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
