import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostomersModule } from './costomers/costomers.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import {AuthorizeMenuModule} from "./authorize-menu/authorize-menu.module";
import {RoleModule} from "./role/role.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CostomersModule,
    DashboardModule,
    OrdersModule,
    ProductsModule,
    AuthorizeMenuModule,
    RoleModule
  ]
})
export class ComponentsModule { }
