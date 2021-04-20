
import {  Action, ActionReducerMap, createReducer, MetaReducer, on, State} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { WeatherActionTypes, LoadWeathersAction, LoadWeathersSuccessAction, LoadWeathersFailureAction, RemoveWeatherForcastAction } from '../actions/weather.actions';
import { CityActionTypes, LoadCitiesAction, LoadCitiesSuccessAction, LoadCitiesFailureAction } from '../actions/city.actions';
import { city } from '../model/city';
import { WeatherData } from '../model/weather';
import { errorResponse } from '../model/error';

export interface WeatherState {
  weatherData: WeatherData;
  error:errorResponse| null;
}

const initialWeatherState: WeatherState = {
  weatherData: null,
  error: null,
};

export interface Citiestate {
  cities: city[] | null;
  error: any | null;
}

const initialCitiestate: Citiestate  = {
  cities: null,
  error: null
};

export interface AppState {
  weather: WeatherState;
  cities: Citiestate;
}

const weatherReducer = createReducer(
  initialWeatherState,
  on(LoadWeathersAction , state => ({ ...state })),
  on(LoadWeathersSuccessAction, (state, payload) => ({ ...state, weatherData: payload.data })),
  on(LoadWeathersFailureAction, (state,payload) => ({ ...state, error:payload.error }))
);


const CityReducer = createReducer(
  initialCitiestate,
  on(LoadCitiesAction , state => ({ ...state })),
  on(LoadCitiesSuccessAction, (state, payload) => { 
    return {...state, cities: payload.data };
  }),
  on(LoadCitiesFailureAction, (state,payload) => ({ ...state, error:payload.error }))
);

//export const reducers = combineReducers(weatherReducer, CityReducer)
// export const reducers: ActionReducer<AppState> = combineReducers(CityReducer,weatherReducer)

export const reducers: ActionReducerMap<AppState> = {
  cities: CityReducer,
  weather:weatherReducer
};

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];

//export const selectCities = (state: AppState) => state.cities.cities; 