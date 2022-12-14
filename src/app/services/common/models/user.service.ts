import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/Token/TokenResponse';
import { Create_User } from 'src/app/contracts/User/Create_User';
import { User } from 'src/app/entities/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService : HttpClientService, private toastrService : CustomToastrService) { }

  async create(user : User) :Promise<Create_User> {
    const observable : Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller:"users"
    }, user);

    return await firstValueFrom(observable) as Create_User;
  }

  async login(userNameOrEmail: string, password: string, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "auth",
      action: "login"
    }, { userNameOrEmail, password })

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) //eğer token doğru ise
      localStorage.setItem("accessToken", tokenResponse.token.accessToken) //local storage da bu acces token ı tutuyorum

      this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır.", "Giriş Başarılı", {
        messageType : ToastrMessageType.Success,
        position : ToastrPosition.BottomFullWidth
      })

    callBackFunction();
  }

  // async googleLogin(user : SocialUser, callBackFunction? : () => void) : Promise<any> {
  //   const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post< SocialUser | TokenResponse>({
  //     action : "google-login",
  //     controller: "Auth"
  //   }, user)

  //   debugger;
  //   const tokenResponse = await firstValueFrom(observable) as TokenResponse;

  //   if (tokenResponse) {
  //     localStorage.setItem("accessToken", tokenResponse.token.accessToken);
  //     this.toastrService.message("Google ile başarıyla giriş yaptınız.", "Google Girişi Başarılı", {
  //       messageType: ToastrMessageType.Success,
  //       position : ToastrPosition.BottomRight
  //     });
  //   }

  //   callBackFunction();
  // }
}
