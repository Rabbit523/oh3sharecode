import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MapActions, MapActionTypes } from './map.actions';
import { MapState } from './map.state';
import { MapInfo } from '../../shared/models/webapi/geolocation/PlaceInfo';

export function MapReducer(state = { mapList: new Array<MapInfo>(), lat: 0, log: 0 }, action: MapActions): MapState {
  switch (action.type) {
    case MapActionTypes.SHOW:
      return Object.assign({}, state, { lat: action.payload.lat, log: action.payload.log });
    case MapActionTypes.AddMap:
      let temp = { lat: state.lat, log: state.log, mapList: Object.assign([...state.mapList, action.payload]) };
      return temp;
    default:
      return state;
  }
}
