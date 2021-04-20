import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadLatLngCityAction } from 'src/app/actions/city.actions';
import { WeatherData } from 'src/app/model/weather';
import { AppState } from 'src/app/reducers';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-weather-view',
  templateUrl: './weather-view.component.html',
  styleUrls: ['./weather-view.component.scss']
})
export class WeatherViewComponent implements OnInit {
  weathers$ = new Observable<WeatherData>();
  constructor(private store: Store<AppState>) { }
  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((coors:any)=>{
      console.log(coors);
     // this.store.dispatch(LoadLatLngCityAction({lat:coors.coords.latitude+'',lng:coors.coords.longitude+''}))
    });
    this.weathers$ = this.store.select(st => st.weather.weatherData)
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
      }));
  }
}
