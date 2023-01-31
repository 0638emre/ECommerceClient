import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent, SpinnerType} from "../../../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";
import {ProductService} from "../../../../services/common/models/product.service";
import {AlertifyService, MessageType, Position} from "../../../../services/admin/alertify.service";
import {DialogService} from "../../../../services/common/dialog.service";
import {MatTableDataSource} from "@angular/material/table";
import {List_Product} from "../../../../contracts/List_Product";
import {MatPaginator} from "@angular/material/paginator";
import {
  SelectProductImageDialogComponent
} from "../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component";
import {RoleService} from "../../../../services/common/models/role.service";
import { List_Role } from '../../../../contracts/role/List_Role';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
              private roleService: RoleService,
              private alertifyService: AlertifyService)
  {
    super(spinner)
  }

  displayedColumns: string[] = ['name', 'edit', 'delete']; //grid de görüntelemek istediğimiz kolonları veriyoruz
  //silme işlemi içinde bir kolon veriyoruz ki ilgili satırın karşılığında buton oluşsun

  dataSource : MatTableDataSource<List_Role> = null; //gelen verileri burada karşılıyoruz.
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //burada datasource ile sayfalama(pagination) arasında bağ kuruyoruz fakat bizim çalışmamızda sayfa yüklenirken datasource dolduğundan dolayı
  //bu işlemi datasource dolduktan sonra gerçekleştirmemiz gerekmekte.
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }


  async getRoles() {
    this.showSpinner(SpinnerType.BallAtom);
    const allRoles : { datas: List_Role[], totalCount: number } = await this.roleService.getRoles(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallAtom), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }));

    this.dataSource = new MatTableDataSource<List_Role>(allRoles.datas);
    this.paginator.length = allRoles.totalCount;
  }

  //page her değiştiğinde bu fonk çalışıp yeni querysting göndrerek apiye o datalar gelecek
  async pageChange() {
    await this.getRoles()
  }

  //ngOnInit sayfa ilk yüklendiğinde çalışır.
  async ngOnInit() {
    await this.getRoles();
  };
}
