import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadFavoritesLocationAction } from 'src/app/actions/weather.actions';

import { favorite } from 'src/app/model/favorite';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  faivoritesPlaces$:Observable<Array<favorite>>;
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
   this.store.dispatch(LoadFavoritesLocationAction());
   this.faivoritesPlaces$ =  this.store.select(st=>st.weather.favorites);
  }

}
