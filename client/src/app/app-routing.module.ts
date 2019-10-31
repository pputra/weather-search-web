import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentWeatherComponent } from '../app/current-weather/current-weather.component';
import { FavoritesComponent } from '../app/favorites/favorites.component';

const routes: Routes = [
  { path: 'currentWeather', component: CurrentWeatherComponent },
  { path: 'favorites', component: FavoritesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
