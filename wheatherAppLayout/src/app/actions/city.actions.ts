import { Action, createAction, props } from '@ngrx/store';
import { city } from '../model/city';

export enum CityActionTypes {
  LoadCities = '[City] Load Cities',
  LoadCitiesSuccess = '[City] Load Cities Success',
  LoadCitiesFailure = '[City] Load Cities Failure',
}

export const LoadCitiesAction = createAction(CityActionTypes.LoadCities, props <{city:any}>());
export const LoadCitiesSuccessAction = createAction(CityActionTypes.LoadCitiesSuccess ,  props< { data: city[] }>());
export const LoadCitiesFailureAction = createAction(CityActionTypes.LoadCitiesFailure, props< { error: any }>());
export class LoadCities implements Action {
  readonly type = CityActionTypes.LoadCities;
}

export class LoadCitiesSuccess implements Action {
  readonly type = CityActionTypes.LoadCitiesSuccess;
  constructor(public payload: { data: city[] }) { }
}

export class LoadCitiesFailure implements Action {
  readonly type = CityActionTypes.LoadCitiesFailure;
  constructor(public payload: { error: any }) { }
}

export type CityActions =  LoadCities | LoadCitiesSuccess | LoadCitiesFailure;

