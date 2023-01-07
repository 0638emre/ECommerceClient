import {Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import {DynamicLoadComponentDirective} from "./directives/common/dynamic-load-component.directive";
import {DynamicLoadComponentService} from "./services/common/dynamic-load-component.service";
import { ComponentType } from "../app/services/common/dynamic-load-component.service"
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(DynamicLoadComponentDirective, {static:true})
  dynamicLoadComponentDirective : DynamicLoadComponentDirective


  constructor(public authService:AuthService, private toastrService : CustomToastrService,private router : Router, private dynamicLoadComponentService : DynamicLoadComponentService){
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


  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent, this.dynamicLoadComponentDirective.viewContainerRef);
  }

}


// $.get("https://localhost:7125/api/products", data =>
//   console.log(data))

// $(document).ready(() =>
// {
//   alert("jquery denemesi")
// }
// )
