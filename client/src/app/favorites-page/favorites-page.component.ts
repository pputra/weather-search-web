import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit {
  hasFavorite;
  favorites = [];
  constructor() { }

  ngOnInit() {
    this.hasFavorite = localStorage.length > 0;

    this.createFavoritesFromLocalStorage();
  }

  createFavoritesFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
      const city = localStorage.key(i);
      this.favorites.push({
        city,
        state: localStorage.getItem(city),
      });
    }

    this.favorites.reverse();
  }

}
