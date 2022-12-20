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
  }

  ngOnInit(): void {
    this.signalRService.on(ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      this.alertfiy.message(message, {messageType : MessageType.Notify, position : Position.TopRight })
    });
  }
}
