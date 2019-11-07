import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  isLoading = false;

  constructor(
    loaderService: LoaderService,
  ) { 
    loaderService.isLoading.subscribe((val: any) => {
      this.isLoading = val;
    });
  }

  ngOnInit() {
  }

}
