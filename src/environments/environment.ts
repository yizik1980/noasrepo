// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  autocomplet:'https://dataservice.accuweather.com/locations/v1/cities/autocomplete',
  fiveDays:'https://dataservice.accuweather.com/forecasts/v1/daily/5day/',
  oneDay:'https://dataservice.accuweather.com/forecasts/v1/daily/1day/',
  apiCode:'apikey=edE5Oo8GZa8bkMX8b1fAnzquxw5kKf88&metric=true',
  hebLang:'&language=he-il',
  iconsUrl: 'https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/',
  geoCodeId:'&key=AIzaSyBFUa3WpzNxdnEic3dZCgMONWH9u5A4NLA',
  geoLoc:'https://maps.googleapis.com/maps/api/geocode/json?'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
