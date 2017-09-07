import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AppComponent } from './app.component';

let appRoutes: Routes = [
  { path: '', component: AppComponent},

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });
