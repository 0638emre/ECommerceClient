import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/Token/TokenResponse';
import { Create_User } from 'src/app/contracts/User/Create_User';
import { User } from 'src/app/entities/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';
import {List_User} from "../../../contracts/User/List_User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService : HttpClientService, private toastrService : CustomToastrService) { }

  async getAllUsers(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalUsersCount: number; users: List_User[] }> {
    const observable: Observable<{ totalUsersCount: number; users: List_User[] }> = this.httpClientService.get({
      controller: "users",
      queryString: `page=${page}&size=${size}`
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error));

    return await promiseData;
  }

  async assignRoleToUser(id: string, roles: string[], successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "users",
      action: "assign-role-to-user"
    }, {
      userId: id,
      roles: roles
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(() => successCallBack())
      .catch(error => errorCallBack(error));

    await promiseData;
  }

  async getRolesToUser(userId: string, successCallBack?: () => void, errorCallBack?: (error) => void): Promise<string[]> {
    const observable: Observable<{ userRoles: string[] }> = this.httpClientService.get({
      controller: "users",
      action: "get-roles-to-user"
    }, userId);

    const promiseData = firstValueFrom(observable);
    promiseData.then(() => successCallBack())
      .catch(error => errorCallBack(error));

    return (await promiseData).userRoles;
  }

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

  async googleLogin(user : SocialUser, callBackFunction? : () => void) : Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post< SocialUser | TokenResponse>({
      action : "google-login",
      controller: "Auth"
    }, user)

    debugger;
    const tokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      this.toastrService.message("Google ile başarıyla giriş yaptınız.", "Google Girişi Başarılı", {
        messageType: ToastrMessageType.Success,
        position : ToastrPosition.BottomRight
      });
    }

    callBackFunction();
  }

  async updatePassword(userId: string, resetToken: string, password: string, passwordConfirm: string, successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      action: "update-password",
      controller: "users"
    }, {
      userId: userId,
      resetToken: resetToken,
      password: password,
      passwordConfirm: passwordConfirm
    });

    const promiseData: Promise<any> = firstValueFrom(observable);
    promiseData.then(value => successCallBack()).catch(error => errorCallBack(error));
    await promiseData;
  }
}
