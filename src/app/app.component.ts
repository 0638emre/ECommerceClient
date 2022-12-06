import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { concatWith } from 'rxjs';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'ECommerceClient';

  constructor(public authService:AuthService, private toastrService : CustomToastrService,private router : Router){
    authService.identityCheck();
  }

  signOut() {
    localStorage.removeItem("accessToken");
    let result = this.authService.identityCheck();

    this.router.navigate([""]);

    this.toastrService.message("Oturum kapatılmıştır!","Oturum kapatıldı!", {
      messageType : ToastrMessageType.Info,
      position : ToastrPosition.BottomRight
    })
  }

}


// $.get("https://localhost:7125/api/products", data =>
//   console.log(data))

// $(document).ready(() =>
// {
//   alert("jquery denemesi")
// }
// )
