import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/List_Product';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import {QrcodeDialogComponent} from "../../../../dialogs/qrcode-dialog/qrcode-dialog.component";

declare var $ : any; // burada jquery i talep ediyoruz

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
              private productService: ProductService,
              private alertifyService: AlertifyService,
              private dialogService: DialogService) {
    super(spinner)
  }
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate','updatedDate', 'photos','qrCode','edit','delete']; //grid de görüntelemek istediğimiz kolonları veriyoruz
  //silme işlemi içinde bir kolon veriyoruz ki ilgili satırın karşılığında buton oluşsun

  dataSource : MatTableDataSource<List_Product> = null; //gelen verileri burada karşılıyoruz.

  @ViewChild(MatPaginator) paginator: MatPaginator;

  //burada datasource ile sayfalama(pagination) arasında bağ kuruyoruz fakat bizim çalışmamızda sayfa yüklenirken datasource dolduğundan dolayı
  //bu işlemi datasource dolduktan sonra gerçekleştirmemiz gerekmekte.
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }


  async getProducts(){
    this.showSpinner(SpinnerType.BallFussion);
    const allProducts : {totalProductCount:number; products:List_Product[]}= await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this. paginator ? this.paginator.pageSize : 5,()=> this.hideSpinner(SpinnerType.BallFussion),
            errorMessage => this.alertifyService.message(errorMessage,{
                dismissOthers : true,
                messageType: MessageType.Error,
                position: Position.TopRight
            }));
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalProductCount;
    // this.dataSource.paginator = this.paginator; bunu kapatıyoruz çünkü artık biz direkt olarak API seviyesinde pagination yapıyoruz ona göre data gönderiyoruz
  };


  addProductImages(id : string) {
    this.dialogService.openDialog({
      componentType : SelectProductImageDialogComponent,
      data : id,
      options :{
        width: "1400px"
      }
    });
  }

  // //buradaki işlemi her yerde kullanabiliriz o yüzden single responsibility olmalı.
  // delete(id, event){
  //   const img : HTMLImageElement = event.srcElement;
  //   // console.log(img.parentElement.parentElement) //burada tr yi yakalamak için çünkü o satırı hem data olarak hem görsel olarak sileceğiz.
  //   $(img.parentElement.parentElement).fadeOut(1500); // burada jquery kullanarak ilgili satırı 1,5 sn de sil dedik.
  // }

  //page her değiştiğinde bu fonk çalışıp yeni querysting göndrerek apiye o datalar gelecek
  async pageChange() {
    await this.getProducts()
  }

  //ngOnInit sayfa ilk yüklendiğinde çalışır.
  async ngOnInit() {
    await this.getProducts();
  };

  showQRCode(productId: string) {
    this.dialogService.openDialog({
      componentType: QrcodeDialogComponent,
      data: productId,
      afterClosed: () => { }
    })
  }
}
