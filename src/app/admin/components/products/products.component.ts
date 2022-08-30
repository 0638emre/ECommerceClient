import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService, private httpClientService:HttpClientService) {
    super(spinner);
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallFussion)

    this.httpClientService.get<Product[]>({
      controller:"products"
    }).subscribe(data => console.log(data));

    this.httpClientService.delete({ 
      controller:"products"
    },"AAD6F8AD-48BA-4E97-2A09-08DA8AB601B5")
    .subscribe()
    //delete metodunu çalıştıramadım. yeniden dene.

    // this.httpClientService.put({
    //   controller:"products"
    // },{id:"EFEDC33F-6A3D-4FE5-4344-08DA8AB37C2D",
    //   name:"Değişen Nesne",
    //   stock:1500,
    //   price:2.8    
    // }).subscribe()

    // this.httpClientService.post({
    //   controller:"products"
    // },{
    //   name: 'Tavan U ',
    //   stock:5000,
    //   price:3
    // }).subscribe();

    // this.httpClientService.post({
    //   controller:"products"
    // },{
    //   name: 'Tavan C',
    //   stock:2500,
    //   price:5
    // }).subscribe();

    // this.httpClientService.post({
    //   controller:"products"
    // },{
    //   name: 'Alçı Köşe',
    //   stock:7000,
    //   price:10
    // }).subscribe();


  }

}
