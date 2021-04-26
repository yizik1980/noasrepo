
import { Action, ActionReducerMap, createReducer, MetaReducer, on, State } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { WeatherActionTypes, LoadWeathersAction, LoadWeathersSuccessAction, LoadWeathersFailureAction, saveSingleWeatherForcast, LoadFavoritesLocationAction } from '../actions/weather.actions';
import { CityActionTypes, LoadCitiesAction, LoadCitiesSuccessAction, LoadCitiesFailureAction, selectCity } from '../actions/city.actions';
import { city } from '../model/city';
import { WeatherData } from '../model/weather';
import { errorResponse } from '../model/error';
import { favorite } from '../model/favorite';

export interface WeatherState {
  weatherData: WeatherData;
  error: errorResponse | null;
  favorites: Array<favorite>;
}

const initialWeatherState: WeatherState = {
  weatherData: null,
  error: null,
  favorites: new Array<favorite>()
};

export interface Citiestate {
  cities: city[] | null;
  error: any | null;
  selectedCity:{name:string,key:string}
}

const initialCitiestate: Citiestate = {
  cities: null,
  error: null,
  selectedCity:null
};

export interface AppState {
  weather: WeatherState;
  cities: Citiestate;
}

const weatherReducer = createReducer(
  initialWeatherState,
  on(LoadWeathersAction, state => ({ ...state })),
  on(LoadWeathersSuccessAction, (state, payload) => ({ ...state, weatherData: payload.data })),
  on(LoadWeathersFailureAction, (state, payload) => ({ ...state, error: payload.error })),
  on(saveSingleWeatherForcast, (state, payload) => {
    debugger;
    if(state.favorites.some((item)=>payload.f.key == item.key) || !payload.f){
      return state;
    }
    let sesstionFav = JSON.parse(sessionStorage.getItem('faviorate'));
    if(!sesstionFav){
      sesstionFav = [];
    }
    sesstionFav.push({
      ...payload.f 
    });
    sessionStorage.setItem('faviorate', JSON.stringify(sesstionFav));
    return {
      ...state,
      favorites:[...state.favorites,payload.f]
    };
  }),
  on(LoadFavoritesLocationAction, (state, payload)=>{
    let sessionFav = JSON.parse(sessionStorage.getItem('faviorate'));
    if(!sessionFav){
      sessionFav = [];
    }

    return {
      ...state,
      favorites:sessionFav
    };
  })
);


const CityReducer = createReducer(
  initialCitiestate,
  on(LoadCitiesAction, state => ({ ...state })),
  on(LoadCitiesSuccessAction, (state, payload) => {
    return { ...state, cities: payload.data };
  }),
  on(LoadCitiesFailureAction, (state, payload) => ({ ...state, error: payload.error })),
  on(selectCity,(state, payload)=>({...state,selectedCity:{name:payload.name, key:payload.key}}))
);

//export const reducers = combineReducers(weatherReducer, CityReducer)
// export const reducers: ActionReducer<AppState> = combineReducers(CityReducer,weatherReducer)

export const reducers: ActionReducerMap<AppState> = {
  cities: CityReducer,
  weather: weatherReducer
};

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];

//export const selectCities = (state: AppState) => state.cities.cities; 