import {Component} from '@angular/core';
import {BaseComponent, SpinnerType} from "../../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";
import {UserAuthService} from "../../../services/common/models/user-auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertifyService, MessageType, Position} from "../../../services/admin/alertify.service";
import {UserService} from "../../../services/common/models/user.service";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent extends BaseComponent{

  constructor(spinner : NgxSpinnerService, private userAuthService : UserAuthService, private activatedRoute : ActivatedRoute, private alerfifyService : AlertifyService, private userService : UserService, private router: Router)
  {
    super(spinner);
  }

  state : any = false;
  ngOnInit(): void {
      this.showSpinner(SpinnerType.SquareJellyBox);
      this.activatedRoute.params.subscribe({
        next : params => {
          const userId : string = params["userId"];
          const resetToken : string = params["resetToken"];
          this.userAuthService.verifyResetToken(resetToken, userId, () => {
            this.state = true;
            this.hideSpinner(SpinnerType.SquareJellyBox);
          })
        }
      })
  }

  async updatePassword(password : string, passwordConfirm : string)
  {
    this.showSpinner(SpinnerType.BallFussion);
    if (password != passwordConfirm){
      this.alerfifyService.message("Şifreleri doğrulayınız", {
        messageType : MessageType.Warning,
        position : Position.TopCenter
      });
      this.hideSpinner(SpinnerType.BallFussion);
      return;
    }

    this.activatedRoute.params.subscribe({
      next : async params => {
        const userId: string = params["userId"];
        const resetToken: string = params["resetToken"];
        await this.userService.updatePassword(userId, resetToken, password, passwordConfirm,
          () => {
            this.alerfifyService.message("Şifre başarıyla güncellenmiştir.",{
              messageType : MessageType.Success,
              position : Position.TopCenter
            })
            this.router.navigate(["/login"])
        },
          error => {
            this.alerfifyService.message("Şifre güncellenemedi. Hata oluştu.",{
              messageType : MessageType.Error,
              position : Position.TopCenter
            });
            this.hideSpinner(SpinnerType.BallFussion);
          }
        );

      }
      })
  }

}
