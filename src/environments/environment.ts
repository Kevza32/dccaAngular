// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

declare var configuraciones: any;
const url = configuraciones.endPointGlobal;
const urlWS = configuraciones.endPointWS;
const urlroot = configuraciones.endPoint;


export const environment = {
  production: true,
  END_POINT: url,
  END_POINT_WS: urlWS,
  END_POINT_ROOT: urlroot    
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
