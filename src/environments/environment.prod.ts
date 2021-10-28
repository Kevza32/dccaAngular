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