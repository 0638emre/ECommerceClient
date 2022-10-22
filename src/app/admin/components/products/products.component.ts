import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
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

    // this.httpClientService.get<Product[]>({
    //   controller:"products"
    // }).subscribe(data => console.log(data));

    // this.httpClientService.delete({ 
    //   controller:"products"
    // }, "7ED60EC5-ED1F-4C22-BBEE-08DA8C0FF4FC")
    // .subscribe()

    // this.httpClientService.put({
    //   controller:"products"
    // },{id:"F5251E09-A97B-45C4-BBED-08DA8C0FF4FC",
    //   name:"Yeni nesne güncellendi",
    //   stock:1,
    //   price:1.985    
    // }).subscribe()

    // this.httpClientService.post({
    //   controller:"products"
    // },{
    //   name: 'testtttt ',
    //   stock:5000,
    //   price:3
    // }).subscribe();

    // this.httpClientService.get({
    //   baseUrl : "https://jsonplaceholder.typicode.com/",
    //   controller:"posts"
    // }).subscribe(data=>console.log(data));

  }

}
