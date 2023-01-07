import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {BaseComponent, SpinnerType} from 'src/app/base/base.component';
import {BasketService} from "../../../services/common/models/basket.service";
import { List_Basket_Item } from '../../../contracts/basket/list_basket_item';
import { Update_Basket_Item } from '../../../contracts/basket/update_basket_item';
import {OrderService} from "../../../services/common/models/order.service";
import {CustomToastrService, ToastrMessageType, ToastrPosition} from "../../../services/ui/custom-toastr.service";
import {Router} from "@angular/router";
import {DialogService} from "../../../services/common/dialog.service";
import {
  BasketItemDeleteState,
  BasketItemRemoveDialogComponent
} from "../../../dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component";
import {Create_Order} from "../../../contracts/Order/create_order";
import {
  ShoppingCompleteDialogComponent, ShoppingCompleteState
} from "../../../dialogs/shopping-complete-dialog/shopping-complete-dialog.component";


declare var $:any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css']
})
export class BasketsComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService, private basketService: BasketService, private orderService: OrderService, private toastrService: CustomToastrService, private router: Router, private dialogService: DialogService) {
    super(spinner)
   }

   basketItems: List_Basket_Item[];
  async ngOnInit(): Promise<void>
  {
    this.showSpinner(SpinnerType.BallFussion);
    this.basketItems = await this.basketService.get();
    this.hideSpinner(SpinnerType.BallFussion);
  }

  async changeQuantity(object : any)
  {
    this.showSpinner(SpinnerType.BallFussion);
    const basketItemid = object.target.attributes["id"].value;
    const quantity = object.target.value;

    const basketItem : Update_Basket_Item = new Update_Basket_Item();
    basketItem.BasketItemId = basketItemid;
    basketItem.Quantity = quantity;

    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.BallFussion);
  }

  removeBasketItem(basketItemId:string)
  {
    $("#basketModal").modal("hide");
    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialogComponent,
      data : BasketItemDeleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.SquareJellyBox);
        await this.basketService.remove(basketItemId);
        $("." + basketItemId).fadeOut(900, ()=> {
          this.hideSpinner(SpinnerType.SquareJellyBox);
          $("#basketModal").modal("show");
        });
        $("#basketModal").modal("show");

      }
    });

  }

  shoppingComplete()
  {
    $("#basketModal").modal("hide");

    this.dialogService.openDialog({
      componentType: ShoppingCompleteDialogComponent,
      data: ShoppingCompleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.BallAtom);
        const order: Create_Order = new Create_Order();
        order.address = "Yenimahalle";
        order.description = "Falanca filanca...";
        await this.orderService.create(order);
        this.hideSpinner(SpinnerType.BallAtom);
        this.toastrService.message("Sipariş alınmıştır!", "Sipariş Oluşturuldu!", {
          messageType: ToastrMessageType.Info,
          position: ToastrPosition.TopRight
        })
        this.router.navigate(["/"]);
      }
    });
  }

  modalClose()
  {
    $("#basketModal").modal("hide");
  }
}
