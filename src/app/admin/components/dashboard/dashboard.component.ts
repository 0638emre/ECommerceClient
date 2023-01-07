import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {BaseComponent} from 'src/app/base/base.component';
import {AlertifyService, MessageType, Position} from 'src/app/services/admin/alertify.service';
import {SignalRService} from "../../../services/common/signalr.service";
import {ReceiveFunctions} from "../../../constans/receive-functions";
import {HubUrls} from "../../../constans/hub-urls";

@Component({
  selector: 'app-dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private alertfiy: AlertifyService, spinner:NgxSpinnerService, private signalRService : SignalRService) {
    super(spinner);
    signalRService.start(HubUrls.ProductHub);
    signalRService.start(HubUrls.OrderHub );
  }

  ngOnInit(): void {
    this.signalRService.on(HubUrls.ProductHub, ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      this.alertfiy.message(message, {messageType : MessageType.Notify, position : Position.TopRight })
    });

    this.signalRService.on(HubUrls.OrderHub, ReceiveFunctions.OrderAddedMessageReceiveFunction, message => {
      this.alertfiy.message(message, {messageType : MessageType.Notify, position : Position.TopCenter })
    });
  }
}
