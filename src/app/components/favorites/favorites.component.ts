import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCity } from 'src/app/actions/city.actions';
import { LoadFavoritesLocationAction } from 'src/app/actions/weather.actions';

import { favorite } from 'src/app/model/favorite';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  faivoritesPlaces$: Observable<Array<favorite>>;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(LoadFavoritesLocationAction());
    this.faivoritesPlaces$ = this.store.select(st => st.weather.favorites);
  }
  clickFaviorate(place: favorite) {
    this.router.navigate(['/',place.key, place.name]);
  }

}
