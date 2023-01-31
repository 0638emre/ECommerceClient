import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../../services/common/models/product.service";
import {List_Product} from "../../../../contracts/List_Product";
import {ActivatedRoute} from "@angular/router";
import {FileService} from "../../../../services/common/models/file.service";
import {BaseUrl} from "../../../../contracts/baseUrl";
import {BasketService} from "../../../../services/common/models/basket.service";
import {BaseComponent, SpinnerType} from "../../../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";
import {Create_Basket_Item} from "../../../../contracts/basket/create_basket_item";
import {CustomToastrService, ToastrMessageType, ToastrPosition} from "../../../../services/ui/custom-toastr.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(private productService: ProductService, private activatedRoute : ActivatedRoute, private fileService : FileService, private basketService : BasketService, spinner : NgxSpinnerService,
              private toastrService : CustomToastrService)
  {
    super(spinner)
  }
  currentPageNo : number;
  totalProductCount : number;
  totalPageCount : number;
  pageSize : number = 12;
  pageList : number [] = [];
  products: List_Product[];
  baseUrl : BaseUrl;
  async ngOnInit() {
    this.baseUrl = await this.fileService.GetBaseStorageUrl();

    this.activatedRoute.params.subscribe(async params => { //burası queryde verilen pagination için yazıldı

      this.currentPageNo = parseInt(params["pageNo"] ?? 1) ;

      const data : { totalProductCount : number, products : List_Product[]} = await this.productService.read(this.currentPageNo - 1,this.pageSize,
      () => {

      },
      errorMessage => {

      });
    this.products = data.products;

    this.products = this.products.map<List_Product>(p=> {
      const listProduct : List_Product = {
        id: p.id,
        createdDate : p.createdDate,
        imagePath : p.productImageFiles.length ? p.productImageFiles.find(p=>p.showcase).path : "",
        updatedDate : p.updatedDate,
        name : p.name,
        stock : p.stock,
        price : p.price,
        productImageFiles : p.productImageFiles
      };
      return listProduct;
    });

    this.products.forEach((product, i) => {
      let p : any = {
        name : product.name,
        id : product.id,
        price : product.price,
        stock : product.stock,
        updateDate : product.updatedDate,
        createDate : product.createdDate,
        imagePath : product.productImageFiles.length ? product.productImageFiles.find(p=>p.showcase) : ""
      };
    });

    this.totalProductCount = data.totalProductCount;
    this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

    this.pageList = [];

    if (this.currentPageNo - 3 <= 0)
    {
      for (let i = 1; i <=7; i++)
      {
        this.pageList.push(i);
      }
    }else if (this.currentPageNo + 3 >= this.totalPageCount)
    {
      for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
      {
        this.pageList.push(i);
      }
    }else
    {
      for (let i = this.totalPageCount - 3; i <= this.totalPageCount + 3; i++)
      {
        this.pageList.push(i);
      }
    }
    });
  }

  async addToBasket(product : List_Product)
  {
    this.showSpinner(SpinnerType.SquareJellyBox);
    let basket_item : Create_Basket_Item = new Create_Basket_Item();
    basket_item.ProductId = product.id;
    basket_item.Quantity = 1;

    await this.basketService.add(basket_item);
    this.hideSpinner(SpinnerType.SquareJellyBox);
    this.toastrService.message("Ürün sepete eklenmiştir.", "Sepete Eklendi", {
      messageType : ToastrMessageType.Success,
      position : ToastrPosition.BottomRight
    });
  }

}
