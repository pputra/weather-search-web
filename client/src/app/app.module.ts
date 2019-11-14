import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherPageComponent } from './modules/weather-page/weather-page.component';
import { FavoritesPageComponent } from './modules/favorites-page/favorites-page.component';
import { WeatherSearchFormComponent } from './modules/weather-search-form/weather-search-form.component';
import { WeatherCardComponent } from './modules/weather-page/components/weather-card/weather-card.component';
import { HourlyWeatherComponent } from './modules/weather-page/components/hourly-weather/hourly-weather.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AlertComponent } from './components/alert/alert.component';
import { WeeklyWeatherComponent } from './modules/weather-page/components/weekly-weather/weekly-weather.component';
import { WeatherModalComponent } from './modules/weather-page/components/weather-modal/weather-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherPageComponent,
    FavoritesPageComponent,
    WeatherSearchFormComponent,
    WeatherCardComponent,
    HourlyWeatherComponent,
    LoaderComponent,
    AlertComponent,
    WeeklyWeatherComponent,
    WeatherModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
