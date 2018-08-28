export class PlaceInfo {
    placeid: number;
    position: string;
}

export class MapInfo extends PlaceInfo {
    lat: number;
    log: number;
    date: number;
}