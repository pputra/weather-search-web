import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit, OnDestroy {
  hasFavorite;
  favorites = [];
  TOOL_TIP_POSITION = 'below';
  EMPTY_RECORD_MESSAGE= 'No Records.';

  constructor(
    private router: Router,
    private alertService: AlertService,
  ) { }

  createFavoritesFromLocalStorage() {
    this.favorites = [];
    for (let i = 0; i < localStorage.length; i++) {
      const storageId = localStorage.key(i);
      const favoriteData = JSON.parse(localStorage.getItem(storageId));
      this.favorites.push({ ...favoriteData });
    }
  }

  removeFromFavorite(city) {
    localStorage.removeItem(city);
    this.createFavoritesFromLocalStorage();
    this.checkNumberOfRecord();
  }

  checkNumberOfRecord() {
    this.hasFavorite = localStorage.length > 0;

    if (this.hasFavorite) {
      this.alertService.message.next('');
    } else {
      this.alertService.message.next(this.EMPTY_RECORD_MESSAGE);
    }
  }

  openFavoriteCity(lat, lon, city, state) {
    this.router.navigate(['/currentWeather'], {
      queryParams: {
        lat,
        lon,
        city,
        state,
      },
    });
  }

  ngOnInit() {
    this.checkNumberOfRecord();
    this.createFavoritesFromLocalStorage();
  }

  ngOnDestroy() {
    this.alertService.message.next('');
  }

}
