import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit {
  hasFavorite;
  favorites = [];
  TOOL_TIP_POSITION = 'below';
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.hasFavorite = localStorage.length > 0;
    this.createFavoritesFromLocalStorage();
  }

  createFavoritesFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
      const storageId = localStorage.key(i);
      const favoriteData = JSON.parse(localStorage.getItem(storageId));
      this.favorites.push({ ...favoriteData });
    }
  }

  removeFromFavorite(city) {
    localStorage.removeItem(city);
    this.favorites = [];
    this.hasFavorite = localStorage.length > 0;
    this.createFavoritesFromLocalStorage();
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
}
