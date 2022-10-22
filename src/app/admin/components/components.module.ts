import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostomersModule } from './costomers/costomers.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CostomersModule,
    DashboardModule,
    OrdersModule,
    ProductsModule
  ]
})
export class ComponentsModule { }