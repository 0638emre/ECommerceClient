import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper : JwtHelperService) { }

  identityCheck() {
    //npm i @auth0/angular-jwt
    const token : string = localStorage.getItem("accessToken");
    //ve ele aldığımız tokenı kontrol edeceğiz bunu da jwt helper service ile çözüyoruz.
    //const decodeToken = this.jwtHelper.decodeToken(token);

    //süre nedir ?
    //const expirationDate : Date = this.jwtHelper.getTokenExpirationDate(token); 

    //süre dolup dolmadığını burada verecek false ise devam et yani süresi dolmadı
    let expired : Boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }

    //buradaki amaç user authenticate oldu mu olmadı mı oldu ise true yap ki menümüzde vs çıkış yap olsun login olmasın gibi user exp önem verelim.
    _isAuthenticated = token != null && !expired;
  }

  get isAuthenticated() : boolean {
    return _isAuthenticated;
  }
}


export let _isAuthenticated: boolean;