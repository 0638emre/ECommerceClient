import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $ : any; //jquery için

@Directive({
  selector: '[appDelete]' // bu keyword ile yani directive ile istediğimiz html de çağırarak bu ts içerisindeki manipüleyi kullanabiliriz.
})
export class DeleteDirective {

  constructor(
    private element:ElementRef,
    private _renderer: Renderer2,
    private httpClientService : HttpClientService,
    private spinner : NgxSpinnerService,
    public dialog : MatDialog,
    private alertifyService : AlertifyService
    ) {
        const img = _renderer.createElement("img");
        img.setAttribute("src", "../../../../../assets/delete_icon.png");
        img.setAttribute("style","cursor:pointer;");
        img.width = 25;
        img.height = 25;
        _renderer.appendChild(element.nativeElement, img)
      }

      @Input() id : string;
      @Input() controller : string;
      @Output() callback : EventEmitter<any> = new EventEmitter();

      @HostListener("click") //host listener:ilgili directifin kullanıldığı anda devreye girmesini sağlar. metodu işaretleyerek o metodu gerçekleştirir.
      async onClick(){
        this.openDialog(async () => {
          this.spinner.show(SpinnerType.BallFussion)
          const td : HTMLTableCellElement = this.element.nativeElement;
          // await this.productService.delete(this.id);
          this.httpClientService.delete({
            controller: this.controller
          },this.id).subscribe(data => {
            $(td.parentElement).animate({
              opacity: 0,
              left: "=50",
              height: "toogle"
            }, 700, () => {
              this.callback.emit();
              this.alertifyService.message("Ürün başarıyla silinmiştir.", {
                dismissOthers:true,
                messageType : MessageType.Success,
                position: Position.BottomRight
              });
            });
          }, (errorResponse : HttpErrorResponse) => {
            this.spinner.hide(SpinnerType.BallFussion);
            this.alertifyService.message("Ürün silinemedi. Hata oluştu", {
              dismissOthers:true,
              messageType : MessageType.Error,
              position: Position.BottomRight
            });
          });
        });
      }

      openDialog(afterClosed: any): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
          width: '250px',
          data: DeleteState.Yes,
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if(result == DeleteState.Yes) {-
            afterClosed();
          }
        });
      }
}
