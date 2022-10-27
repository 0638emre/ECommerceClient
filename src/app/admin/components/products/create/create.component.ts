import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/Create_Product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spiner: NgxSpinnerService, private alertify: AlertifyService, private productService:ProductService) {
    super(spiner)
   }

   //burada bir create işlemi olduğunda list componenti çalışması için bir event outputu oluşturacağız ve list componentinin ts inde ise input eventi oluşturacağız

  ngOnInit(): void {
  }

  @Output() createdProduct : EventEmitter<Create_Product> = new EventEmitter();
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action : "upload",
    controller : "products",
    explanation : "Fotoğrafları sürükleyin veya seçin.",
    isAdminPage : true,
    accept: ".png, .jpg, .jpeg"
  };

  create(name :HTMLInputElement, stock :HTMLInputElement, price :HTMLInputElement)  {

    // create fonksiyonuna tıklandı ise biz önce spinerı başlatalım
    this.showSpinner(SpinnerType.BallFussion);

    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    this.productService.create(create_product, () => {
            this.hideSpinner(SpinnerType.BallFussion), 
            this.alertify.message("Ürün başarıyla eklenmiştir.", {
              dismissOthers: true,
              messageType:MessageType.Success,
              position: Position.BottomRight
            })
            this.createdProduct.emit(create_product); //burada eklenen datayı emit ediyoruz. ki list componentinde listelensin
          }, errorMessage => {
            this.alertify.message(errorMessage,
              {
                dismissOthers : true,
                messageType : MessageType.Error,
                position : Position.BottomRight
              });
              
          });
    
          
    //ardından servisden bir sonuç döndüğünde onu hidespanner ile kapatalım. fakat bunun için productservice üzerindeki fonksiyona da parametre gereklidir.
  }
}