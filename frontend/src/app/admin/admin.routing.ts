import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserNewComponent } from './user-new/user-new.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { OrdersComponent } from './orders/orders.component';
import { OnlyAdminGuard } from '../services/only-admin.guard';

export const routes: Routes = [
  {
    path: 'dashboard/users',
    component: DashboardComponent,
    canActivate: [OnlyAdminGuard],
    children: [
      { path: 'list', component: UserListComponent },
      { path: 'new', component: UserNewComponent },
      { path: 'edit/:id', component: UserNewComponent },
      { path: '', pathMatch: 'full', redirectTo: 'list' },
    ],
  },
  {
    path: 'dashboard/products',
    component: DashboardComponent,
    children: [
      { path: 'list', component: ProductListComponent },
      { path: 'new', component: ProductNewComponent },
      { path: 'edit/:id', component: ProductNewComponent },
      { path: '', pathMatch: 'full', redirectTo: 'list' },
    ],
  },
  {
    path: 'dashboard/orders',
    component: DashboardComponent,
    children: [
      { path: 'list', component: OrdersComponent },
      { path: '', pathMatch: 'full', redirectTo: 'list' },
    ],
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    canActivate: [OnlyAdminGuard],
    redirectTo: 'dashboard/users',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
