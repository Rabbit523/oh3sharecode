import { Action } from '@ngrx/store';
import { MapState } from "../../modules/mapstate";
import { MapInfo } from '../../shared/models/webapi/geolocation/PlaceInfo';


export const MapActionTypes = {
  SHOW: '[Map] Show',
  AddMap: '[Map] AddMap',
};
export class MapShowAction implements Action {
  type = MapActionTypes.SHOW;
  constructor(public payload: any) { }
}
export class AddMapAction implements Action {
  type = MapActionTypes.AddMap;
  constructor(public payload: MapInfo) { }
}
export type MapActions = MapShowAction | AddMapAction;