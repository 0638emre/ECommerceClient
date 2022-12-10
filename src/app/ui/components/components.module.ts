import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketsModule } from './baskets/baskets.module';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProductsModule,
    HomeModule,
    BasketsModule,
    RegisterModule
    // LoginModule //login modülde google gibi social loginleri kullandığımız için ve onların kuralında app modüle declare etmek gerektiği için buradan kaldırım deirekt olarak login componenti app modüle declare ediyoruz.
  ]
})
export class ComponentsModule { }
