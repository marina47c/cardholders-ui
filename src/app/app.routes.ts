import { Routes } from '@angular/router';
import { authGuard } from '../core/auth.guard';
import { Cardholders } from '../components/cardholders/cardholders';
import { Login } from '../components/login/login';

export const routes: Routes = [
  { path: 'cardholders', component: Cardholders, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];