import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  CityActionTypes, LoadCitiesAction, LoadCitiesFailureAction, LoadCitiesSuccessAction, selectCity
} from '../actions/city.actions';
import { AppState, Citiestate } from '../reducers';
import { map, catchError, switchMap, debounceTime } from 'rxjs/operators';
import { RemoteInfoService } from '../services/remote-info.service';
import { Observable, of } from 'rxjs';
import {  LoadWeathersFailureAction, LoadWeathersSuccessAction} from '../actions/weather.actions';

@Injectable()
export class HttpMonitorEffects {
  constructor(
    private citiesActions$: Actions,
    private weatherActions$: Actions,
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
            return of(LoadCitiesFailureAction(err));
          })
        );
      })
    );

  @Effect()
  weatherEffect$ = this.weatherActions$.pipe(ofType(selectCity)
    , switchMap((loc: any) => {
      return this.http.getCurrentWheaterFormLocation(loc.key)
        .pipe(map(weatherOb => {
          // weatherOb.initIcon();
          return LoadWeathersSuccessAction({ data: weatherOb });
        }),
          catchError((err) => {
            return of(LoadWeathersFailureAction(err));
          }))
    }));
}
