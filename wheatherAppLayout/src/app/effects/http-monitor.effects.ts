import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  CityActionTypes, LoadCitiesAction, LoadCitiesFailureAction, LoadCitiesSuccessAction
} from '../actions/city.actions';
import { AppState, Citiestate } from '../reducers';
import { map, catchError, switchMap, debounceTime } from 'rxjs/operators';
import { RemoteInfoService } from '../services/remote-info.service';
import { Observable, of } from 'rxjs';
import { LoadWeathersAction, LoadWeathersFailureAction, LoadWeathersSuccessAction, WeatherActionTypes } from '../actions/weather.actions';

@Injectable()
export class HttpMonitorEffects {
  constructor(
    private citiesActions$: Actions,
    private weatherActions$: Actions,
    private store: Store<AppState>,
    private http: RemoteInfoService
  ) { }
  @Effect()
  LoadCities$ = this.citiesActions$.pipe(
    ofType(CityActionTypes.LoadCities))
    // .pipe(debounceTime(2000))
    .pipe(
      switchMap((action: any) => {
        return this.http.getCities(action.city).pipe(
          map((citiesRes) => {
            return LoadCitiesSuccessAction({ data: citiesRes });
          }),
          catchError((err) => {
            debugger;
            return of(LoadCitiesFailureAction(err));
          })
        );
      })
    );

  @Effect()
  weatherEffect$ = this.weatherActions$.pipe(ofType(LoadWeathersAction)
    , switchMap((loc: any) => {
      return this.http.getCurrentWheaterFormLocation(loc.cityName)
        .pipe(map(weatherOb => {
          // weatherOb.initIcon();
          return LoadWeathersSuccessAction({ data: weatherOb });
        }),
          catchError((err) => {
            return of(LoadWeathersFailureAction(err));
          }))
    }))
}
