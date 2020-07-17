import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin.routing';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserNewComponent } from './user-new/user-new.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { ProductListComponent } from './product-list/product-list.component';
import { OrdersComponent } from './orders/orders.component';

import { ImgPipe } from '../pipes/img.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    UserListComponent,
    UserNewComponent,
    ProductNewComponent,
    ProductListComponent,
    OrdersComponent,
    ImgPipe,
  ],
  imports: [CommonModule, AdminRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [ImgPipe],
})
export class AdminModule {}
