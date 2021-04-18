import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, throwError } from 'rxjs';
import { WeatherData } from 'src/app/model/weather';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-weather-view',
  templateUrl: './weather-view.component.html',
  styleUrls: ['./weather-view.component.scss']
})
export class WeatherViewComponent implements OnInit, OnDestroy {
  weathers$ = new Observable<WeatherData>();
  WeatherData:WeatherData;
  WeatherSubscription = new Subscription();
  constructor(private store:Store<AppState>) {

  }
  ngOnDestroy(): void {
    this.WeatherSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.weathers$ = this.store.select(st=>st.weather.weatherData);
    this.WeatherSubscription = this.weathers$.subscribe(res=>{
      this.WeatherData = res;
    },
    err=>{
      console.log(err);
    });
  }

}
