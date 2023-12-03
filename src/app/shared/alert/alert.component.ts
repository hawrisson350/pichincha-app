import { Component } from '@angular/core';
import { AlertService } from 'src/app/data/service/Alert.service';

@Component({
  selector: '<bpi-alert>',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})

export class AlertComponent {
  constructor(public alertService: AlertService) { }

  sendEmit(selected:string){
    this.alertService.btnSelect(selected);
  }
}
