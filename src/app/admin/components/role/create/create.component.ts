import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseComponent, SpinnerType} from "../../../../base/base.component";
import {AlertifyService, MessageType, Position} from "../../../../services/admin/alertify.service";
import {NgxSpinnerService} from "ngx-spinner";
import {RoleService} from "../../../../services/common/models/role.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spiner: NgxSpinnerService, private alertify: AlertifyService, private roleService : RoleService)
  {
    super(spiner)
  }

  ngOnInit(): void {
  }

  @Output() createdRole: EventEmitter<string> = new EventEmitter();

  create(name :HTMLInputElement)  {

    // create fonksiyonuna tıklandı ise biz önce spinerı başlatalım
    this.showSpinner(SpinnerType.BallFussion);

    this.roleService.create(name.value, () => {
      this.hideSpinner(SpinnerType.BallFussion),
        this.alertify.message("Rol başarıyla eklenmiştir.", {
          dismissOthers: true,
          messageType:MessageType.Success,
          position: Position.BottomRight
        })
      this.createdRole.emit(name.value); //burada eklenen datayı emit ediyoruz. ki list componentinde listelensin
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
