import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/List_Product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,private productService: ProductService, private alertifyService: AlertifyService) { 
    super(spinner)
  }
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate','updatedDate']; //grid de görüntelemek istediğimiz kolonları veriyoruz
  dataSource : MatTableDataSource<List_Product> = null; //gelen verileri burada karşılıyoruz.

  @ViewChild(MatPaginator) paginator: MatPaginator;

  //burada datasource ile sayfalama(pagination) arasında bağ kuruyoruz fakat bizim çalışmamızda sayfa yüklenirken datasource dolduğundan dolayı
  //bu işlemi datasource dolduktan sonra gerçekleştirmemiz gerekmekte.
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }


  async getProducts(){
    this.showSpinner(SpinnerType.BallFussion);
    const allProducts : {totalCount:number; products:List_Product[]}= await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this. paginator ? this.paginator.pageSize : 5,()=> this.hideSpinner(SpinnerType.BallFussion), 
            errorMessage => this.alertifyService.message(errorMessage,{
                dismissOthers : true,
                messageType: MessageType.Error,
                position: Position.TopRight
            }));
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
    // this.dataSource.paginator = this.paginator; bunu kapatıyoruz çünkü artık biz direkt olarak API seviyesinde pagination yapıyoruz ona göre data gönderiyoruz
  };

  //page her değiştiğinde bu fonk çalışıp yeni querysting göndrerek apiye o datalar gelecek 
  async pageChange() {
    await this.getProducts()
  }

  //ngOnInit sayfa ilk yüklendiğinde çalışır.
  async ngOnInit() {
    await this.getProducts();

  };
}
