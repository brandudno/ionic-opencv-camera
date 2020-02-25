import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/guards/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'ui', pathMatch: 'full' },
  {
    path: 'ui',
    loadChildren: () => import('./pages/ui/ui.module').then( m => m.UiPageModule), 
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }