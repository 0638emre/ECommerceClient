import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { AuthService, _isAuthenticated } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private jwtHelper : JwtHelperService, private rooter : Router, private toastrService : CustomToastrService, private spinner : NgxSpinnerService) {

  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    //bu bölümde bi spinner devreye girsin.
    this.spinner.show(SpinnerType.BallNewtonCradle)
    // //önce tokenı elimize alıyoruz. boş ise false göndereceğiz. dolu ise onun gerçekten bizim tokenımız olup olmadığını anlayacağımız kütüphaneyi indirmemiz gerekli.
    // //npm i @auth0/angular-jwt
    // const token : string = localStorage.getItem("accessToken");

    // //ve ele aldığımız tokenı kontrol edeceğiz bunu da jwt helper service ile çözüyoruz.
    // //const decodeToken = this.jwtHelper.decodeToken(token);

    // //süre nedir ?
    // //const expirationDate : Date = this.jwtHelper.getTokenExpirationDate(token); 

    // //süre dolup dolmadığını burada verecek false ise devam et yani süresi dolmadı
    // let expired : Boolean;
    // try {
    //   expired = this.jwtHelper.isTokenExpired(token);
    // } catch {
    //   expired = true;
    // }
    // debugger;
    
    if (!_isAuthenticated) { //eğer token yok ise ya da süresi dolmuş ise login ekranına yönlendir.
      this.rooter.navigate(["login"], {queryParams : {returnUrl : state.url}}); //buradaki ikinci parametre bize şunu veriyor. Login olduktan sonra nereye gidecek.mesela kullanıcı bilgilerim hepsi burada örneği.
      this.toastrService.message("Oturum açmanız gerekmektedir.", "Yetkisiz Erişim", 
      {
        messageType : ToastrMessageType.Warning,
        position : ToastrPosition.BottomRight
      })

    }

    this.spinner.hide(SpinnerType.BallNewtonCradle);

    return true;
  }
  
}