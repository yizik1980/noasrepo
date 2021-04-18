import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { fromEvent, Observable } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';
import { LoadCitiesAction } from 'src/app/actions/city.actions';
import { LoadWeathersAction } from 'src/app/actions/weather.actions';
import { city } from 'src/app/model/city';
import { errorResponse } from 'src/app/model/error';
import { AppState } from './../../reducers';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css']
})
export class SearchCityComponent implements OnInit, OnDestroy {
  cities: city[];
  // units = ['standard','metric','imperial'];
  choosenCity: city;
  showList: boolean;
  errorMessage = '';
  @ViewChild('dataList')
  dataListIetm: ElementRef;
  @ViewChild('autocompelet')
  autocompelet: ElementRef;
  constructor(private store: Store<AppState>) {
  }
  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {

  }

  autoCompeletCity($event: city) {
    this.choosenCity = $event;
  }

  ngOnInit(): void {
    this.store.select(store => store.cities?.cities).subscribe(cities => {
      this.cities = cities;
    });
  }

  focusCity($event: any) {
    this.showList = true;
  }
 
  showWeather() {
    if (this.choosenCity) {
      this.store.dispatch(LoadWeathersAction({ cityName: this.choosenCity.LocalizedName }));

    } else {
      this.errorMessage = 'few arguments are missing';
    }
  }

}