// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    geolocation: { url: 'http://api.ipbase.com/v1/json/' },
    weather: {
      key: 'e0b22d7f4b884b3e85104732222605',
      url_history: 'http://api.weatherapi.com/v1/history.json',
      url_forecast: 'http://api.weatherapi.com/v1/forecast.json',
      url_current: 'http://api.weatherapi.com/v1/current.json',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
