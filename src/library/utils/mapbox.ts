import mapboxgl, { MapboxOptions } from 'mapbox-gl';

export const initialiseMap = ( props : MapboxOptions ) => {
  const {
    container = 'mapbox',
    style = 'mapbox://styles/mapbox/light-v10',
    interactive = true
  } = props;

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
  return new mapboxgl.Map( {
    ...props,
    container: container,
    style: style,
    interactive: interactive,
    center: [106.67925048393934, 10.769882021614002],
    zoom: 14
  } );
};
