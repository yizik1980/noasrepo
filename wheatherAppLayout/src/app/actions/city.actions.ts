import { Action, createAction, props } from '@ngrx/store';
import { city } from '../model/city';

export enum CityActionTypes {
  LoadCities = '[City] Load Cities',
  LoadCitiesSuccess = '[City] Load Cities Success',
  LoadCitiesFailure = '[City] Load Cities Failure',
  LoadLatLngCity = '[City] Load Coordinats Location'
}

export const LoadCitiesAction = createAction(CityActionTypes.LoadCities, props <{city:any}>());
export const LoadCitiesSuccessAction = createAction(CityActionTypes.LoadCitiesSuccess ,  props< { data: city[] }>());
export const LoadCitiesFailureAction = createAction(CityActionTypes.LoadCitiesFailure, props< { error: any }>());
export const LoadLatLngCityAction = createAction(CityActionTypes.LoadLatLngCity, props <{lat:string, lng:string}>());

