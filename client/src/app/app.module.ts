import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts'

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
