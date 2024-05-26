// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL: 'https://localhost:7267/api/',
  cloudinary: {
    cloudName: 'dbmmuorib',
    URL: 'cloudinary://727459136938598:jLBcUm0OIlq1Yyfmy9tJIlOu0ro@dbmmuorib',
    uploadPreset: 'Viajeros',
    apiKey: '727459136938598',
    apiSecret: 'jLBcUm0OIlq1Yyfmy9tJIlOu0ro'
  },
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
