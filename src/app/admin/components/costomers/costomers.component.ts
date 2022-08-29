import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-costomers',
  templateUrl: './costomers.component.html',
  styleUrls: ['./costomers.component.css']
})

//extends c#daki implement gibi.
export class CostomersComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService) {
    super(spinner);
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallFussion);
  }

}
