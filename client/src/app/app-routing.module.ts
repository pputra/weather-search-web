import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherPageComponent } from './modules/weather-page/weather-page.component';
import { FavoritesPageComponent } from './modules/favorites-page/favorites-page.component';

const routes: Routes = [
  { path: 'currentWeather', component: WeatherPageComponent },
  { path: 'favorites', component: FavoritesPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
