import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import {  StoreDevtoolsModule } from '@ngrx/store-devtools';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { SearchCityComponent } from './components/search-city/search-city.component'
import { EffectsModule } from '@ngrx/effects';
import { HttpMonitorEffects } from './effects/http-monitor.effects';
import {metaReducers,reducers} from './reducers';
import { WeatherItemComponent } from './components/weather-item/weather-item.component';
import { WeatherViewComponent } from './components/weather-view/weather-view.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FavoriteItemComponent } from './components/favorite-item/favorite-item.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SearchCityComponent,
    WeatherItemComponent,
    WeatherViewComponent,
    AutocompleteComponent,
    FavoritesComponent,
    FavoriteItemComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers,{metaReducers}),
    EffectsModule.forRoot([HttpMonitorEffects, ]),
    !environment.production? StoreDevtoolsModule.instrument():[],
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
