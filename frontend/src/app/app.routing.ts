import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LicoresComponent } from './components/licores/licores.component';
import { CartComponent } from './components/cart/cart.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoggedInGuard } from './services/logged-in.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'login',
    canActivate: [LoggedInGuard],
    component: LoginComponent,
  },
  { path: 'licores/:id', component: LicoresComponent },
  {
    path: 'register',
    canActivate: [LoggedInGuard],
    component: RegisterComponent,
  },
  { path: 'cart', component: CartComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
