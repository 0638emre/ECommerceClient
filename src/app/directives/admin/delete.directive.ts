import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
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
    private productService : ProductService,
    private spinner : NgxSpinnerService
    ) {
        const img = _renderer.createElement("img");
        img.setAttribute("src", "../../../../../assets/delete_icon.png");
        img.setAttribute("style","cursor:pointer;");
        img.width = 25;
        img.height = 25;
        _renderer.appendChild(element.nativeElement, img)
      }

      @Input() id : string;
      @Output() callback : EventEmitter<any> = new EventEmitter();

      @HostListener("click") //host listener:ilgili directifin kullanıldığı anda devreye girmesini sağlar. metodu işaretleyerek o metodu gerçekleştirir.
      async onClick(){
        this.spinner.show(SpinnerType.BallFussion)
        const td : HTMLTableCellElement = this.element.nativeElement;
        await this.productService.delete(this.id);
        $(td.parentElement).fadeOut(1500, () => {
          this.callback.emit();
        });
        this.spinner.hide();
      }

}
