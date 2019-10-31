import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-weather-search-form',
  templateUrl: './weather-search-form.component.html',
  styleUrls: ['./weather-search-form.component.css']
})
export class WeatherSearchFormComponent implements OnInit {
  addressForm
  hasEmptyInput
  constructor(
    private formBuilder: FormBuilder,
  ) { 
    this.addressForm = this.formBuilder.group({
      street: '',
      city: '',
      state: '',
    });

    this.hasEmptyInput = {
      street: false,
      city: false,
      state: false,
    };
  }

  onSubmit(addressData) {
    console.log(addressData);
    this.checkForm(addressData);
  }

  onResetForm() {
    this.addressForm.reset();
    this.hasEmptyInput = {
      street: false,
      city: false,
      state: false,
    };
  }

  checkForm(addressData) {
    for (let input in addressData) {
      this.hasEmptyInput[input] = addressData[input].length === 0;
    }
  }

  ngOnInit() {
  }
}
