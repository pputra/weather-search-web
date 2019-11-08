import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherPageComponent } from './weather-page/weather-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { WeatherSearchFormComponent } from './weather-search-form/weather-search-form.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { HourlyWeatherComponent } from './hourly-weather/hourly-weather.component';
import { LoaderComponent } from './loader/loader.component';
import { AlertComponent } from './alert/alert.component';

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
