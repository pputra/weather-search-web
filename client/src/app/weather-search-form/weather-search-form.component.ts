import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-weather-search-form',
  templateUrl: './weather-search-form.component.html',
  styleUrls: ['./weather-search-form.component.css']
})
export class WeatherSearchFormComponent implements OnInit {
  addressForm;
  showErrorMessages;
  statesOptions;
  disabledSearch;

  constructor(
    private formBuilder: FormBuilder,
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

    this.statesOptions = {
      "": "Select State",
      AL: 'Alabama',
      AK: 'Alaska',
      AZ: 'Arizona',
      AR: 'Arkansas',
      CA: 'California',
      CO: 'Colorado',
      CT: 'Connecticut',
      DE: 'Delaware',
      DC: 'District Of Columbia',
      FL: 'Florida',
      GA: 'Georgia',
      HI: 'Hawaii',
      ID: 'Idaho',
      IL: 'Illinois',
      IN: 'Indiana',
      IA: 'Iowa',
      KS: 'Kansas',
      KY: 'Kentucky',
      LA: 'Louisiana',
      ME: 'Maine',
      MD: 'Maryland',
      MA: 'Massachusetts',
      MI: 'Michigan',
      MN: 'Minnesota',
      MS: 'Mississippi',
      MO: 'Missouri',
      MT: 'Montana',
      NE: 'Nebraska',
      NV: 'Nevada',
      NH: 'New Hampshire',
      NJ: 'New Jersey',
      NM: 'New Mexico',
      NY: 'New York',
      NC: 'North Carolina',
      ND: 'North Dakota',
      OH: 'Ohio',
      OK: 'Oklahoma',
      OR: 'Oregon',
      PA: 'Pennsylvania',
      RI: 'Rhode Island',
      SC: 'South Carolina',
      SD: 'South Dakota',
      TN: 'Tennessee',
      TX: 'Texas',
      UT: 'Utah',
      VT: 'Vermont',
      VA: 'Virginia',
      WA: 'Washington',
      WV: 'West Virginia',
      WI: 'Wisconsin',
      WY: 'Wyoming',
    };

    this.disabledSearch = true;
    this.onInputChanges();
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

  onInputChanges() {
    this.addressForm.valueChanges.subscribe((inputs: any) => {
      const {
        street,
        city,
        state,
      } = inputs;

      this.toggleDisableSearchButton(street, city, state);
    });
  }

  toggleWarningMessages(key, val) {
    this.showErrorMessages[key] = val === '' ? true : false;
  }

  toggleDisableSearchButton(street: string, city: string, state: string) {
    const hasNonEmptyInputs = street !== '' && city !== '' && state !== '';
    if (hasNonEmptyInputs) {
      this.disabledSearch = false;
    } else {
      this.disabledSearch = true;
    }
  }

  onResetForm() {
    this.addressForm = this.formBuilder.group({
      street: '',
      city: '',
      state: '',
    });

    this.disabledSearch = true;
  
    this.showErrorMessages = {
      street: false,
      city: false,
      state: false,
    };
    this.onInputChanges();
    this.router.navigate(['/']);
  }

  hasEmptyInputs(addressData: object) {
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
