import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { WeatherService } from '../../services/weather/weather.service';
import { LoaderService } from '../../services/loader/loader.service';

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
  activePage;
  options: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loaderService: LoaderService,
    private weatherService: WeatherService,
  ) { 
    this.addressForm = this.formBuilder.group({
      street: '',
      city: '',
      state: '',
      useCurrentLocation: false,
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

    this.activePage = 'results';
  
    this.onInputChanges();
  }

  onSubmit(addressData) {
    const {
      street,
      city,
      state,
      useCurrentLocation,
    } = addressData;

    this.activePage = 'results';

    if (useCurrentLocation) {
      this.weatherService.getUserCoordinate().subscribe((result: any) => {
        const {
          lat,
          lon,
          city,
          region: state,
        } = result;

        this.router.navigate(['/currentWeather'], {
          queryParams: {
            lat,
            lon,
            city,
            state,
          },
        });
      });
    } else {
      this.router.navigate(['/currentWeather'], {
        queryParams: {
          street,
          city,
          state,
        },
      });
    }
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

  onCityInputChanges(input) {
      if (!input) {
        this.options = [];
        return;
      }

      this.weatherService.getCityAutoCompleteSuggestions(input).subscribe((response: any) => {
        this.options = response.places;
      });
  }

  toggleWarningMessages(key, val) {
    this.showErrorMessages[key] = val === '' ? true : false;
  }

  toggleDisableInputs(isDisabled) { 
    if (isDisabled) {
      this.addressForm.get('street').setValue('');
      this.addressForm.get('city').setValue('');
      this.addressForm.get('state').setValue('');
      this.addressForm.get('street').disable();
      this.addressForm.get('city').disable();
      this.addressForm.get('state').disable();

      this.showErrorMessages = {
        street: false,
        city: false,
        state: false,
      };
    } else {
      this.addressForm.get('street').enable();
      this.addressForm.get('city').enable();
      this.addressForm.get('state').enable();
    }
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
    this.addressForm.get('street').enable();
    this.addressForm.get('city').enable();
    this.addressForm.get('state').enable();

    this.addressForm = this.formBuilder.group({
      street: '',
      city: '',
      state: '',
      useCurrentLocation: false,
    });

    this.options = [];

    this.disabledSearch = true;
  
    this.showErrorMessages = {
      street: false,
      city: false,
      state: false,
    };
    this.onInputChanges();
    this.router.navigate(['/']);
    this.activePage = 'results';
    this.loaderService.isLoading.next(false);
  }

  navigateToFavoritesPage() {
    this.activePage = 'favorites';
    this.router.navigate(['/favorites']);
  }

  ngOnInit() {
  }
}
