import {Component, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {SpinnerType} from 'src/app/base/base.component';
import {List_Product_Image} from 'src/app/contracts/List_Product_Image';
import {DialogService} from 'src/app/services/common/dialog.service';
import {FileUploadOptions} from 'src/app/services/common/file-upload/file-upload.component';
import {ProductService} from 'src/app/services/common/models/product.service';
import {BaseDialog} from '../base/base-dialog';
import {DeleteDialogComponent, DeleteState} from '../delete-dialog/delete-dialog.component';
import {CustomToastrService, ToastrMessageType, ToastrPosition} from "../../services/ui/custom-toastr.service";

declare var $: any;

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.css']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  constructor(dialogRef : MatDialogRef<SelectProductImageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data : SelectProductImageState | string,
              private productService : ProductService,
              private spinner : NgxSpinnerService,
              private dialogService : DialogService,
              private toastrService : CustomToastrService) {
    super(dialogRef)
  }

  @Output() options : Partial<FileUploadOptions> = {
    accept : ".png, .jpeg, .jpg, .gif",
    action : "upload",
    controller : "products",
    explanation : "Ürün fotoğraflarını seçin ve buraya yükleyin..",
    isAdminPage : true,
    queryString : `id=${this.data}`
  }

  images : List_Product_Image[];

  //ngoninit bir interfacedir. ve implement edildiğin de constructor gibi bu component yüklendiği anda çalışır.
  async ngOnInit() {
    this.spinner.show(SpinnerType.BallAtom);
    this.images = await this.productService.readImages(this.data as string, () => this.spinner.hide(SpinnerType.BallAtom));
  }


  async deleteImage(imageId: string, event:any){

    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.SquareJellyBox);
        await this.productService.deleteImage(this.data as string, imageId, () => {
          this.spinner.hide(SpinnerType.SquareJellyBox);
          var deletedCard =  $(event.srcElement).parent().parent();
          deletedCard.fadeOut(500);
        });
      }
    });
  }

  showCase(imageId: string) {
    this.spinner.show(SpinnerType.BallAtom);

    this.productService.changeShowcaseImage(imageId, this.data as string, () => {
      this.spinner.hide(SpinnerType.BallAtom);
      this.toastrService.message("Ürün birinci fotoğrafı seçildi", "Ürün Fotoğraf Seçimi" , {
        position : ToastrPosition.BottomRight,
        messageType : ToastrMessageType.Success
      })
    });
  }
}

export enum SelectProductImageState {
  Close
}
