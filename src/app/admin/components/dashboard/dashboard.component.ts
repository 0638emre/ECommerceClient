import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private alertfiy: AlertifyService, spinner:NgxSpinnerService) { 
    super(spinner)
  }

  ngOnInit(): void {
    // this.showSpinner(SpinnerType.BallFussion)
  }

  // testEt()
  // {
  //   this.alertfiy.message("Test", {
  //     messageType: MessageType.Success,
  //     delay: 5,
  //     position : Position.TopRight
  //   })
  // }

  // dismiss() {
  //   this.alertfiy.dismiss();
  // }
}
