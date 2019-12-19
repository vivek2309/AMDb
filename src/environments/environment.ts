// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// http://192.168.43.224:3000
export const environment = {
  production: false,
  server: 'https://api.themoviedb.org/3',
  apiKey: '<add_tmdb_api_key>', // This is the TMDb apikey
  // tslint:disable-next-line:max-line-length
  default_Language: 'en-US',
  poster_url: 'http://image.tmdb.org/t/p/w185'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
