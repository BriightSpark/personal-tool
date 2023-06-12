import { FlyToOptions } from 'mapbox-gl';
import { CoordinateModel } from 'models/chapter';

export const normalizeCoord = ( location: CoordinateModel ) : FlyToOptions => {
  return {
    center: [ location.center.lon, location.center.lat],
    bearing: location.bearing,
    zoom: location.zoom,
    pitch: location.pitch,
    duration: location.duration,
    speed: location.duration
  };
};