import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherData } from '../model/weather';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { city } from '../model/city';

@Injectable({
  providedIn: 'root'
})
export class RemoteInfoService {

  constructor(private http: HttpClient) { }
  getCurrentWheaterFormLocation(locationName: string): Observable<WeatherData> {
    return this.http.get<WeatherData>
      (`${environment.fiveDays}${locationName}?${environment.apiCode}`);
  };
  getCities(text: string): Observable<city[]> {
    const url = environment.autocomplet+ '?' + environment.apiCode+ '&q=' + text;
    //http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=eQ54Bwy7RIuZeAn4J7LQkpAzh1AKnLdN&q=hai
    return this.http.get<city[]>(url);
  }
  getGeoLoaction(lat=40.714224,lng=-73.961452){
    const url = `${environment.geoLoc}latlng=${lat},${lng}${environment.geoCodeId}`;
    console.log(url);
    return this.http.get(url);
  }
}
