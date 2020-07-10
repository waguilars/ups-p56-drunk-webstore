import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserNewComponent } from './user-new/user-new.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { OrdersComponent } from './orders/orders.component';

export const routes: Routes = [
  {
    path: 'dashboard/users',
    component: DashboardComponent,
    children: [
      { path: 'user-list', component: UserListComponent },
      { path: 'user-new', component: UserNewComponent },
      { path: '', pathMatch: 'full', redirectTo: 'user-list' },
    ],
  },
  {
    path: 'dashboard/products',
    component: DashboardComponent,
    children: [
      { path: 'product-list', component: ProductListComponent },
      { path: 'product-new', component: ProductNewComponent },
      { path: '', pathMatch: 'full', redirectTo: 'product-list' },
    ],
  },
  {
    path: 'dashboard/orders',
    component: DashboardComponent,
    children: [
      { path: 'order-list', component: OrdersComponent },
      { path: '', pathMatch: 'full', redirectTo: 'order-list' },
    ],
  },
  { path: 'dashboard', pathMatch: 'full', redirectTo: 'dashboard/users' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
