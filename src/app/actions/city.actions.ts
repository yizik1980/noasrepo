import { Action, createAction, props } from '@ngrx/store';
import { city } from '../model/city';

export enum CityActionTypes {
  LoadCities = '[City] Load Cities',
  LoadCitiesSuccess = '[City] Load Cities Success',
  LoadCitiesFailure = '[City] Load Cities Failure',
  SelectCity = '[City] Select City'
}

export const LoadCitiesAction = createAction(CityActionTypes.LoadCities, props <{city:any}>());
export const LoadCitiesSuccessAction = createAction(CityActionTypes.LoadCitiesSuccess ,  props< { data: city[] }>());
export const LoadCitiesFailureAction = createAction(CityActionTypes.LoadCitiesFailure, props< { error: any }>());
export const selectCity = createAction(CityActionTypes.SelectCity, props <{key:string, name:string}>());

