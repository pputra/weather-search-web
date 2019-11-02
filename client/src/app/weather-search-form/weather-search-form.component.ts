import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WeatherService } from '../weather.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-weather-search-form',
  templateUrl: './weather-search-form.component.html',
  styleUrls: ['./weather-search-form.component.css']
})
export class WeatherSearchFormComponent implements OnInit {
  addressForm;
  showErrorMessages;
  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService,
    private router: Router,
  ) { 
    this.addressForm = this.formBuilder.group({
      street: '',
      city: '',
      state: '',
    });

    this.showErrorMessages = {
      street: false,
      city: false,
      state: false,
    };
  }

  onSubmit(addressData) {
    if (this.hasEmptyInputs(addressData)) return;

    const {
      street,
      city,
      state,
    } = addressData;

    this.router.navigate(['/currentWeather'], {
      queryParams: {
        street,
        city,
        state,
      },
    });
  }

  onResetForm() {
    this.addressForm.reset();
    this.showErrorMessages = {
      street: false,
      city: false,
      state: false,
    };
    this.router.navigate(['/']);
  }

  hasEmptyInputs(addressData) {
    let hasEmptyInput = false;
    for (let input in addressData) {
      hasEmptyInput = hasEmptyInput || addressData[input] === null||  addressData[input].length === 0;
      this.showErrorMessages[input] = addressData[input] === null||  addressData[input].length === 0;
    }

    return hasEmptyInput;
  }

  ngOnInit() {
  }
}
