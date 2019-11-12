import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message;

  constructor(
    alertService: AlertService,
  ) {
    alertService.message.subscribe((val: any) => {
      this.message = val;
    });
  }

  ngOnInit() {
  }

}
