import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectCity } from 'src/app/actions/city.actions';
import { saveSingleWeatherForcast } from 'src/app/actions/weather.actions';
import { WeatherData } from 'src/app/model/weather';
import { AppState } from 'src/app/reducers';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-weather-view',
  templateUrl: './weather-view.component.html',
  styleUrls: ['./weather-view.component.scss']
})
export class WeatherViewComponent implements OnInit, OnDestroy {
  weathers$ = new Observable<WeatherData>();
  WeatherDataOb: WeatherData;
  selectCity: { name: string, key: string };
  subscriptionSelection = new Subscription();
  subscriptioWeather = new Subscription();
  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.subscriptionSelection.unsubscribe();
    this.subscriptioWeather.unsubscribe();
  }
  ngOnInit(): void {
    this.subscriptionSelection = this.store.select(st => st.cities.selectedCity)
      .subscribe(selectedCity => {
        this.selectCity = selectedCity;
      });

    this.subscriptioWeather = this.store.select(st => st.weather.weatherData)
      .pipe(map(res => {
        if (res) {
          return {
            ...res,
            DailyForecasts: res.DailyForecasts.map(item => {
              const Dayicon = item.Day.Icon > 10 ? item.Day.Icon + '' : '0' + item.Day.Icon;
              const Nighticon = item.Night.Icon > 10 ? item.Night.Icon + '' : '0' + item.Night.Icon;
              return {
                ...item,
                Day: {
                  ...item.Day,
                  IconUrl: `${environment.iconsUrl}/${Dayicon}-s.png`
                },
                Night: {
                  ...item.Night,
                  IconUrl: `${environment.iconsUrl}/${Nighticon}-s.png`
                },
              };
            })
          }
        }
      })).subscribe(w => {
        this.WeatherDataOb = w;
      })

    this.route.paramMap.subscribe(paramMap => {
      const key = paramMap.get('key');
      const name = paramMap.get('name');
      console.log(name, key);
      if (name && key) {
        this.store.dispatch(selectCity({ key, name }));
      } else {
        //default Tel Aviv Weather forcast
        this.store.dispatch(selectCity({ key: '215854', name: 'Tel Aviv' }));
      }
    })

    // this.store.dispatch(selectCity({ key: '215854', name: 'Tel Aviv' }));
  }

  addTofavorite() {
    const citySelected = { ...this.selectCity };
    const DailyForecast = { ...this.WeatherDataOb };
    const favoriteItem = {
      ...citySelected,
      DailyForecast
    };
    this.store.dispatch(saveSingleWeatherForcast({ f: favoriteItem }))
  }
}
