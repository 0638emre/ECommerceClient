import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private alertfiy: AlertifyService) { }

  ngOnInit(): void {

  }

  testEt()
  {
    this.alertfiy.message("Test", {
      messageType: MessageType.Success,
      delay: 5,
      position : Position.TopRight
    })
  }

  dismiss() {
    this.alertfiy.dismiss();
  }
}
