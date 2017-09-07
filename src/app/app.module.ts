import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SelectedTagComponent } from './selectedTag.component';

import { AppService } from './app.service';
import { AppRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    SelectedTagComponent
  ],
  imports: [
    AppRoutes,
    BrowserModule,
    HttpModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
