import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import {NgxSpinnerService} from "ngx-spinner";
import {CustomToastrService, ToastrMessageType, ToastrPosition} from "../../services/ui/custom-toastr.service";
import {ProductService} from "../../services/common/models/product.service";
import {BaseDialog} from "../base/base-dialog";
import {SpinnerType} from "../../base/base.component";

declare var $: any;


@Component({
  selector: 'app-qrcode-reading-dialog',
  templateUrl: './qrcode-reading-dialog.component.html',
  styleUrls: ['./qrcode-reading-dialog.component.css']
})
export class QrcodeReadingDialogComponent extends BaseDialog<QrcodeReadingDialogComponent>  implements OnInit {

  constructor(
    dialogRef: MatDialogRef<QrcodeReadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private spinner: NgxSpinnerService,
    private toastrService: CustomToastrService,
    private productService: ProductService)
  {
    super(dialogRef)
  }

  @ViewChild("scanner", { static: true }) scanner: NgxScannerQrcodeComponent;
  @ViewChild("txtStock", { static: true }) txtStock: ElementRef;


  ngOnInit(): void {
    this.scanner.start();
  }

  ngOnDestroy(): void {
    this.scanner.stop();
  }

  onEvent(e) {
    this.spinner.show(SpinnerType.BallAtom)
    const data: any = (e as { data: string }).data;
    if (data != null && data != "") {
      const jsonData = JSON.parse(data);
      const stockValue = (this.txtStock.nativeElement as HTMLInputElement).value;

      this.productService.updateStockQrCodeToProduct(jsonData.Id, parseInt(stockValue), () => {
        $("#btnClose").click();
        this.toastrService.message(`${jsonData.Name} ürünün stok bilgisi '${stockValue}' olarak güncellenmiştir.`, "Stok Başarıyla Güncellendi", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        });

        this.spinner.hide(SpinnerType.BallAtom)
      });
    }
  }
}
