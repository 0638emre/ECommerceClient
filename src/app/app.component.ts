import { Component } from '@angular/core';
import { concatWith } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ECommerceClient';

  constructor(private toastrService:CustomToastrService){
    // toastrService.message("test", "test Toastr", {messageType:ToastrMessageType.Info, position:ToastrPosition.BottomFullWidth})
  }


}

// $.get("https://localhost:7125/api/products", data =>
//   console.log(data))

// $(document).ready(() =>
// {
//   alert("jquery denemesi")
// }
// )
